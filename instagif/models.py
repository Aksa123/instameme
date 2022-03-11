from email.policy import default
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import uuid
from PIL import Image as PIL_Image
from io import BytesIO
from django.core.files import File
import os


MEDIA_FOLDER_AVATAR = "instagif/avatar/"
MEDIA_FOLDER_IMAGE = "instagif/image/"

def resize_image(image, size=(128, 128)):
    pil_image = PIL_Image.open(image)
    name, ext = os.path.splitext(image.path)
    ext = ext[1:].upper()
    if ext == "JPG":
        ext = "JPEG"
    pil_image = pil_image.convert("RGB")
    if size is not None:
        pil_image.thumbnail(size, PIL_Image.ANTIALIAS)
    pil_io = BytesIO()
    pil_image.save(pil_io, format='JPEG', quality=50)
    pil_file = File(pil_io, name=image.name)
    return pil_file





class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField()
    name = models.CharField(max_length=100, null=True)
    avatar = models.ImageField(upload_to=MEDIA_FOLDER_AVATAR)
    is_admin = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def trimmed_name(self):
        if len(self.name) > 12:
            return self.name[:12] + "..."
        else:
            return self.name

    def save(self, *args, **kwargs):
        self.avatar = resize_image(self.avatar, size=(128,128))
        super().save(*args, **kwargs)

        


class Following(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="follower")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=MEDIA_FOLDER_IMAGE)
    thumbnail = models.ImageField(upload_to=MEDIA_FOLDER_IMAGE, default=None, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField(default="No description yet...")
    like_count = models.IntegerField(default=0)
    save_count = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def description_short(self):
        if len(self.description) > 100:
            return {
                "show_more": True,
                "short": self.description[:100],
                "long": self.description[100:],
            }
        else:
            return {
                "show_more": False,
                "short": self.description[:100],
                "long": self.description[100:],
            }


    def save(self, *args, **kwargs):
        self.thumbnail = resize_image(self.image, size=(360, 360))
        super().save(*args, **kwargs)



class LikedImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class SavedImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class CommentImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE) 
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def get_trimmed_content(self, limit=50):
       return self.content[:limit]


class Tag(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class TagImage(models.Model):
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


