from django.shortcuts import render
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from .models import *
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from django.conf import settings

# Create your views here.
model2 = AutoModelForSequenceClassification.from_pretrained(
    "Davlan/bert-base-multilingual-cased-finetuned-amharic", num_labels=2
)

model2.load_state_dict(torch.load(settings.BASE_DIR / "model/model.pth"))

tokenizer2 = AutoTokenizer.from_pretrained(settings.BASE_DIR / "model_tokenizer")


@api_view(["POST"])
@permission_classes([AllowAny])
def predict(request: Request):
    text = request.data.get("content")
    inputs = tokenizer2(text, return_tensors="pt")
    outputs = model2(**inputs)
    logits = outputs.logits
    predicted_class = logits.argmax().item()
    print(predicted_class, text)
    if predicted_class == 1:
        return Response({"isHateful": True})
    else:
        return Response({"isHateful": False})
