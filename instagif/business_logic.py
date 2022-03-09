from django.forms import ImageField
import requests
import xmltodict, json
from pprint import pprint, pformat
from django.http.response import HttpResponseServerError, JsonResponse
from .models import Person
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, update_session_auth_hash, login, logout


api_key = "cM1matAF3fba5KWoB6ceGic0qavk36H4"
bundle = "low_bandwidth"

def trim_comment_content(content):
    if len(content) > 50:
        return content[:50] + "..."
    else:
        return content


def str_to_bool(text):
    return text.lower() in ("yes", "true")



def get_mini_comments_from_querysets(querysets):
    mini_comments = []
    for queryset in querysets:
        mini_comments.append({
            "username": queryset.user.person.name,
            "content": queryset.get_trimmed_content(50),
            "date": queryset.date_created
        })
    return mini_comments


def get_user(request, id=None):
    if id is not None:
        user_obj = User.objects.get(id=id)
        person = Person.objects.get(user=user_obj)
        user = {
            "id": user_obj.id,
            "username": person.name,
            "email": person.email,
            "avatar": person.avatar.url,
            "date_created": person.date_created
        }

    else:
        if request.user.is_authenticated:
            person = Person.objects.get(user=request.user)
            user = {
                "id": request.user.id,
                "username": person.name,
                "email": person.email,
                "avatar": person.avatar.url,
                "date_created": person.date_created
            }
        else:
            user = None

    return user


def is_admin(request):
    if request.user.is_authenticated:
        person = Person.objects.get(user=request.user)
        if person.is_admin == False:
            return JsonResponse({
                "status": "ERROR",
                "message": "You are not authorized to access this page!"
            })
        else:
            pass
    else:
        return JsonResponse({
            "status": "ERROR",
            "message": "You are not authorized to access this page!"
        })



