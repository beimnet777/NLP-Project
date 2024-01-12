from django.shortcuts import render
from rest_framework.decorators import permission_classes,api_view
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from .models import *
import torch

# Create your views here.

@api_view(["POST"])
@permission_classes([AllowAny])
def predict(request:Request):
    content = request.data.get("content")
    message = Message.objects.create(content=content)
    print(content)
    res = [1]
    if res[0]>0.5:
        return Response(True)
    else:
        return Response(False)