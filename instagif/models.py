from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import uuid


MEDIA_FOLDER_AVATAR = "instagif/avatar/"
MEDIA_FOLDER_IMAGE = "instagif/image/"


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


class Following(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="follower")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=MEDIA_FOLDER_IMAGE)
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


