from django.db import models

# Create your models here.


class Message(models.Model):
    content = models.TextField()
    prediction = models.BooleanField()

    def __str__(self) -> str:
        return self.content
