from django.db import models
from django.db.models.deletion import SET_NULL

upload_address = "anime_images/"
default_image = upload_address + "no_image.jpg"

class Staff(models.Model):
    ann_id = models.IntegerField()
    name = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add=True)

class Studio(models.Model):
    ann_id = models.IntegerField()
    name = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add=True)

class Anime(models.Model):
    ann_id = models.IntegerField()
    title = models.CharField(max_length=200)
    avatar = models.ImageField(upload_to=upload_address, default=default_image)
    date_added = models.DateTimeField(auto_now_add=True)
    
class RelStudioAnime(models.Model):
    studio_id = models.ForeignKey(to=Studio, null=True, on_delete=models.SET_NULL)
    anime_id = models.ForeignKey(to=Anime, null=True, on_delete=models.SET_NULL)
    role = models.CharField(max_length=200, null=True)

class RelStaffAnime(models.Model):
    staff_id = models.ForeignKey(to=Staff, null=True, on_delete=models.SET_NULL)
    anime_id = models.ForeignKey(to=Anime, null=True, on_delete=models.SET_NULL)
    role = models.CharField(max_length=200)

class Image(models.Model):
    ann_id = models.IntegerField()
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to=upload_address)
    anime_id = models.ForeignKey(to=Anime, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

