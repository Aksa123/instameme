# Generated by Django 3.2.7 on 2022-02-16 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instagif', '0002_image_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
    ]
