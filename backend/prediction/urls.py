from rest_framework.urls import path
from . import views

urlpatterns = [
    path('predict/',views.predict)
]
