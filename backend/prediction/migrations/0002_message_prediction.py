# Generated by Django 5.0.1 on 2024-01-12 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prediction', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='prediction',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
