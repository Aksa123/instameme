from django.db import models
import datetime
from . import constants


class Event(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

class Design(models.Model):
    title = models.CharField(max_length=200)
    event = models.ForeignKey(Event, null=True, on_delete=models.SET_NULL)
    image = models.ImageField(upload_to=str(constants.DESIGNS))
    year = models.IntegerField(default=datetime.datetime.now().year)
    created_at = models.DateTimeField(auto_now_add=True)

class Program(models.Model):
    name = models.CharField(max_length=100)
    content = models.TextField(null=True)
    icon = models.ImageField(upload_to=str(constants.PROGRAM_ICONS))
    pinned_to_desktop = models.BooleanField(default=True)
    pinned_to_startmenu = models.BooleanField(default=False)
    pinned_to_toolbar = models.BooleanField(default=False)
    desktop_icon_position = models.CharField(max_length=10)
    startmenu_icon_size = models.IntegerField(default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, default=None)

