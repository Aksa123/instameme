import re
from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from django.http import request, HttpResponse
from django.template.loader import render_to_string
from django.template import Template, Context
from django.template.engine import Engine
from django.urls import reverse
from pprint import pprint, pformat
from .business_logic import str_to_bool, get_mini_comments_from_querysets, get_user
from .decorators import is_admin
from django.contrib.auth.models import User
from django.db.models import Count
from django.db import connection
from django.contrib.auth import authenticate, update_session_auth_hash, login, logout
from django.core.files.base import ContentFile
from .models import Following, Person, Image, LikedImage, SavedImage, CommentImage, Tag, TagImage
from datetime import datetime
import json
import base64


# Create your views here.
@is_admin
def admin_home(request):
    return redirect("instagif:admin", menu="users")

@is_admin
def admin(request, menu):
    limit = 10
    page = request.GET.get("page", 1)
    offset = (page - 1)*limit                         # 10 items per page
    if menu == "users":
        persons = Person.objects.all()[offset:(limit + offset)]
        items = []
        for person in persons:
            items.append({
                "id": person.user.id,
                "username": person.name,
                "email": person.email,
                "avatar": person.avatar.url,
            })
        template = "admin_users.html"
    elif menu == "images":
        items = Image.objects.all()[offset:(limit + offset)]
        template = "admin_images.html"
    elif menu == "tags":
        items = Tag.objects.all()[offset:(limit + offset)]
        template = "admin_tags.html"
    else:
        return HttpResponse("ERROR: Page not found.")

    return render(request, ("instagif/" + template), context={"items": items, "menu": menu})

@is_admin
def admin_user_edit(request, id):
    if request.method == "GET":
        user = get_user(request, id=id)
        return render(request, "instagif/admin_user_edit.html", context={"user": user})

    elif request.method == "POST":
        if request.is_ajax():
            user = User.objects.get(id=id)
            person = Person.objects.get(user_id=id)
            username = request.POST["username"]
            email = request.POST["email"]
            password_checkbox = request.POST["password_checkbox"]
            password = request.POST["password"]
            password_confirm = request.POST["password_confirm"]

            if password_checkbox:
                if password == password_confirm:
                    user.set_password(password)
                else:
                    return JsonResponse({
                        "status": "ERROR",
                        "message": "Password inputs don't match!"
                    })

            user.first_name = username
            user.username = email
            person.name = username
            person.email = email
            if "avatar" in request.FILES:
                avatar = request.FILES["avatar"]
                person.avatar = avatar
            user.save()
            person.save()

            return JsonResponse({
                "status": "Ok",
                "message": "Profile has been edited successfully."
            })

        else:
            return HttpResponse("ERROR: Request must be made with ajax!")
    else:
        return HttpResponse("ERROR: Forbidden method.")

@is_admin
def admin_user_create(request):
    if request.method == "GET":
        return render(request, "instagif/admin_user_create.html")

    elif request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        avatar = request.FILES["avatar"]
        password = request.POST["password"]
        password_confirm = request.POST["password_confirm"]

        if password == password_confirm:
            user = User.objects.create_user(username=email, first_name=username, password=password)
            person = Person(user=user, name=username, email=email, avatar=avatar)
            person.save()
            return JsonResponse({
                "status": "Ok",
                "message": "Profile has been edited successfully."
            })
        else:
            return JsonResponse({
                "status": "ERROR",
                "message": "Password inputs don't match!"
            })
    else:
        return HttpResponse("ERROR: Forbidden method.")

@is_admin
def admin_user_delete(request, id):
    if request.method == "DELETE":
        current_user_id = request.user.id
        if current_user_id == id:
            print("error del self")
            return JsonResponse({
                "status": "ERROR",
                "message": "Cannot delete yourself like this :("
            })

        user = User.objects.get(id=id)
        user.delete()
        print("success")
        return JsonResponse({
            "status": "Ok",
            "message": "User ID: " + str(user.id) + " has been deleted sucessfully."
        })
    
    else:
        return HttpResponse("ERROR: Forbidden method.")

@is_admin
def admin_tag_edit(request, id):
    if request.method == "GET":
        tag = Tag.objects.get(id=id)
        tag_dict = {
            "id": tag.id,
            "name": tag.name
        }
        return render(request, "instagif/admin_tag_edit.html", context={"tag": tag_dict})

    elif request.method == "POST":
        tag = Tag.objects.get(id=id)
        name = request.POST["name"]                         # encoded data is always in POST dict
        tag.name = name
        tag.save()
        return JsonResponse({
            "status": "Ok",
            "message": "Tag has been updated successfully."
        })

@is_admin
def admin_tag_create(request):
    if request.method == "GET":
        return render(request, "instagif/admin_tag_create.html")
    elif request.method == "POST":
        name = request.POST["name"]
        tag = Tag(name=name)
        tag.save()
        return JsonResponse({
            "status": "Ok",
            "message": "Tag has been created successfully."
        })

@is_admin
def admin_tag_delete(request, id):
    if request.method == "DELETE":
        tag = Tag.objects.get(id=id)
        tag.delete()

        return JsonResponse({
            "status": "Ok",
            "message": "Tag has been deleted successfully."
        })
    else:
        return HttpResponse("ERROR: Forbidden method.")

@is_admin
def admin_image_create(request):
    if request.method == "GET":
        tags = Tag.objects.all()
        users = User.objects.all()

        return render(request, "instagif/admin_image_create.html", context={"tags": tags, "users": users})
    elif request.method == "POST":
        user_id = request.POST["user_id"]
        image = request.FILES["image"]
        title = request.POST["title"]
        tags_str = request.POST["tags_str"]
        tags_split = tags_str.split("-")
        tags_list = []
        for tag_val in tags_split:
            tags_list.append(int(tag_val))        

        new_image = Image(user_id=user_id, image=image, title=title)
        new_image.save()

        for tag in tags_list:
            tag_image = TagImage(tag_id=tag, image=new_image)
            tag_image.save()

        return JsonResponse({
            "status": "Ok",
            "message": "Image has been created successfully."
        })
    else:
        return JsonResponse({
            "status": "ERROR",
            "message": "Forbidden method."
        })

@is_admin
def admin_image_edit(request, id):
    if request.method == "GET":
        image_obj = Image.objects.get(id=id)
        users = User.objects.all()
        tags_obj = Tag.objects.all()
        tags_images = TagImage.objects.filter(image=image_obj)
        tags_images_list = []
        for tag_image in tags_images:
            tags_images_list.append(tag_image.tag_id)
        tags = []
        for tag in tags_obj:
            if tag.id in tags_images_list:
                tags.append({"id": tag.id,
                "name": tag.name,
                "selected": True})
            else:
                tags.append({"id": tag.id,
                "name": tag.name,
                "selected": False})

        return render(request, "instagif/admin_image_edit.html", context={
            "image" : image_obj, 
            "users": users, 
            "tags": tags, 
            "tags_images_list": tags_images_list
            })

    elif request.method == "POST":
        image_obj = Image.objects.get(id=id)
        title = request.POST["title"]
        user_id = request.POST["user_id"]
        
        tags_str = request.POST["tags_str"]
        tags_split = tags_str.split("-")
        tags_list = []
        for tag_val in tags_split:
            tags_list.append(int(tag_val))     

        image_obj.title = title
        image_obj.user_id = user_id
        if "image" in request.FILES:
            image = request.FILES["image"]
            image_obj.image = image
        image_obj.save()

        TagImage.objects.filter(image_id=id).delete()           # delete old tag_images
        for tag in tags_list:
            tag_image = TagImage(tag_id=tag, image=image_obj)
            tag_image.save()

        return JsonResponse({
            "status": "Ok",
            "message": "Image has been updated successfully."
        })
    else:
        return JsonResponse({
            "status": "ERROR",
            "message": "Forbidden method."
        }) 

@is_admin
def admin_image_delete(request, id):
    if request.method == "DELETE":
        image = Image.objects.get(id=id)
        image.delete()
        return JsonResponse({
            "status": "Ok",
            "message": "Image has been deleted successfully."
        })
    else:
        return JsonResponse({
            "status": "ERROR",
            "message": "Forbidden method."
        })

def index(request):
    is_authenticated = request.user.is_authenticated
    page = int(request.GET.get("page", 0))
    offset = page*5                                                                # 5 items per page
    images = Image.objects.all().order_by("-date_created")[offset:(offset+5)]       # limit = 5

    user = get_user(request)

    if is_authenticated:
        following = Following.objects.filter(user_id=user["id"])
    else:
        following = []

    i = 1
    images_list = []
    for image in images:
        if is_authenticated:
            liked_by_user = image.likedimage_set.filter(user_id=user["id"]).exists()
            saved_by_user = image.savedimage_set.filter(user_id=user["id"]).exists()
        else:
            liked_by_user = False
            saved_by_user = False
        id = image.id
        title = image.title
        like_count = image.likedimage_set.count()
        src = image.image.url
        description = image.description.strip()
        description_short = description[:170]
        description_long = description[170:]
        description_show_more = (len(description) > 170)
        uploader = image.user
        tags_obj = TagImage.objects.filter(image=image)
        tags = []
        for tag_obj in tags_obj:
            tags.append({
                "id": tag_obj.tag_id,
                "name": tag_obj.tag.name
            })
        date = image.date_created
        username = image.user.person.name
        avatar = image.user.person.avatar.url
        mini_comments = get_mini_comments_from_querysets(image.commentimage_set.all().order_by("-date_created")[:3])
        mini_comments_count = image.commentimage_set.all().count()
        if i == (images.count() - 1):
            trigger = True
        else:
            trigger = False
        images_list.append({
            "liked_by_user": liked_by_user,
            "saved_by_user": saved_by_user,
            "id": id,
            "title": title,
            "like_count": like_count,
            "date": date,
            "src": src,
            "description": description,
            "description_short": description_short,
            "description_long": description_long,
            "description_show_more": description_show_more,
            "uploader": uploader,
            "tags": tags,
            "username": username,
            "avatar": avatar,
            "mini_comments": mini_comments,
            "mini_comments_count": mini_comments_count,
            "trigger": trigger
        })
        i += 1
    
    if request.is_ajax():
        components = []
        for image in images_list:
            component = render_to_string("instagif/index_component.html", context={
                "user": user,
                "item": image
            })
            components.append({
                "id": image["id"],
                "content": component
            })
        return JsonResponse({
            "user": user,
            "components": components
        })

    else:
        return render(request, "instagif/index.html", context={
            "user": user,
            "images": images_list,
            "following": following
            })

def search_tag(request, tag_name):
    user = get_user(request)
    tag = Tag.objects.get(name=tag_name)
    tag_images = TagImage.objects.filter(tag=tag)
    images = []
    for tag_image in tag_images:
        images.append({
            "id": tag_image.image.id.hex,
            "src": tag_image.image.image.url,
        })

    return render(request, "instagif/search.html", context={
        "images": images,
        "user": user,
        "query": "tag: " + tag_name
    })

def search(request):
    user = get_user(request)
    no_query = "no_query"
    query = request.GET.get("query", no_query).strip()                      # if not exists then no_query
    images = Image.objects.filter(title__icontains=query)
    images_list = []
    for image in images:
        id = image.id.hex
        src = image.image.url
        images_list.append({
            "id": id,
            "src": src
        })
    return render(request, "instagif/search.html", context={
        "query": query,
        "images": images_list,
        "user": user
    })

def profile(request):
    user = get_user(request)
    saved_items = SavedImage.objects.filter(user_id=user["id"])
    save_count = saved_items.count()

    saved_items_list = []
    for saved_item in saved_items:
        saved_items_list.append({
            "id": saved_item.image.id.hex,
            "url": saved_item.image.image.url,
        })        
    
    return render(request, "instagif/profile.html", context={
        "user": user,
        "saved_items_list": saved_items_list,
        "save_count": save_count
    })

def detail(request, id):
    image = Image.objects.get(id=id)
    uploader = get_user(request, id=image.user.id)

    is_authenticated = request.user.is_authenticated
    comment_list = CommentImage.objects.filter(image=image)
    comment_count = comment_list.count()
    tags = TagImage.objects.filter(image_id=id)
    
    comments = []
    for comment in comment_list:
        comments.append({
            "id": comment.id,
            "name": comment.user.person.name,
            "date": comment.date_created,
            "content": comment.content,
            "avatar": comment.user.person.avatar.url
        })

    if is_authenticated:
        user = get_user(request)
        liked_image = LikedImage.objects.filter(user_id=user["id"], image=image).exists()
        saved_image = SavedImage.objects.filter(user_id=user["id"], image=image).exists()
    else:
        user = None
        liked_image = False
        saved_image = False

    like_count = LikedImage.objects.filter(image=image).count()

    return render(request, "instagif/detail.html", context={
        "image": image,
        "uploader": uploader,
        "user": user,
        "like_count": like_count,
        "liked_image": liked_image,
        "saved_image": saved_image,
        "comments": comments,
        "comment_count": comment_count,
        "tags": tags
        })

def user_detail(request, id):
    user = User.objects.get(id=id)
    images = Image.objects.filter(user_id=id).order_by("-date_created")
    posts_count = images.count()
    following_count = Following.objects.filter(user_id=id).count()
    followers_count = Following.objects.filter(following=user).count()
    
    if request.user.is_authenticated:
        is_following = Following.objects.filter(user=request.user, following_id=id).exists()
    else:
        is_following = False

    components_list = []
    for image in images:
        component = render_to_string("instagif/user_detail_component.html", context={
            "image": image
        })
        components_list.append(HttpResponse(component))

    return render(request, "instagif/user_detail.html", context={
        "user": user,
        "images": images,
        "posts_count": posts_count,
        "following_count": following_count,
        "followers_count": followers_count,
        "is_following": is_following
    })

def reel_all(request):
    limit = 5
    page = int(request.GET.get("page", 1))
    if page < 1:
        page = 1
    offset = (page-1)*limit
    is_authenticated = request.user.is_authenticated
    if is_authenticated:
        user = request.user
        images = Image.objects.all().exclude(user=user).order_by("-date_created")[offset:(offset+limit)]
    else:
        user = None
        images = Image.objects.all().order_by("-date_created")[offset:(offset+limit)]

    i = 0
    for image in images:
        liked_image = LikedImage.objects.filter(image=image)
        saved_image = SavedImage.objects.filter(image=image)
        commented_image = CommentImage.objects.filter(image=image)
        image.save_count = saved_image.count()
        image.like_count = liked_image.count()
        image.comment_count = commented_image.count()
        if is_authenticated:
            image.is_liked = liked_image.filter(user_id=user.id).exists()
            image.is_saved = saved_image.filter(user_id=user.id).exists()
            image.is_following = Following.objects.filter(user=user, following_id=image.user_id).exists()
        else:
            image.is_liked = False
            image.is_saved = False
            image.is_following = False
        if i == images.count() - 1:
            image.trigger = True
        else:
            image.trigger = False
        i += 1

    if request.is_ajax():
        images_list = []
        for image in images:
            image_string = render_to_string("instagif/reel_component.html", context={"image": image})
            images_list.append(image_string)

        return JsonResponse({
            "images_list": images_list
        })
        
    return render(request, "instagif/reel.html", context={"images": images, "reel_type": "all"})

def reel(request, user_id):
    images = Image.objects.filter(user_id=user_id)
    # images = images.filter(id="56250dcb544a4f999f0e31ce56006ea5") 
    is_authenticated = request.user.is_authenticated
    if is_authenticated:
        user = request.user
    else:
        user = None
    for image in images:
        liked_image = LikedImage.objects.filter(image=image)
        saved_image = SavedImage.objects.filter(image=image)
        commented_image = CommentImage.objects.filter(image=image)
        image.save_count = saved_image.count()
        image.like_count = liked_image.count()
        image.comment_count = commented_image.count()
        if is_authenticated:
            image.is_liked = liked_image.filter(user_id=user.id).exists()
            image.is_saved = saved_image.filter(user_id=user.id).exists()
            image.is_following = Following.objects.filter(user=user, following_id=user_id).exists()
        else:
            image.is_liked = False
            image.is_saved = False
            image.is_following = False
        

    return render(request, "instagif/reel.html", context={"images": images, "reel_type": "user"})

def upload(request):
    if request.method == "GET":
        tags = Tag.objects.all()
        return render(request, "instagif/upload.html", context={"tags": tags})
    
    elif request.method == "POST":
        if request.is_ajax():
            user = get_user(request)
            title = request.POST["title"]
            name = request.POST["name"]
            image = request.POST["image"]
            description = request.POST["description"]
            tags_str = request.POST["tags"].split("-")
            tags = []
            for tag in tags_str:
                tags.append(int(tag))

            format, imgstr = image.split(';base64,')
            ext = format.split('/')[-1] 
            data = ContentFile(base64.b64decode(imgstr), name=name + "." + ext)

            new_image = Image(user_id=user["id"], image=data, title=title, description=description)
            new_image.save()

            for tag_image in tags:
                tag_image_obj = TagImage(image=new_image, tag_id=tag_image)
                tag_image_obj.save()

            return JsonResponse({
                "status": "Done",
                "message": "Image has been uploaded successfully!",
                "image_id": new_image.id.hex
            })
        else:
            return HttpResponse("ERROR: Only ajax is valid for POST upload method.")
    else:
        return HttpResponse("ERROR: Unsupported method.")

def login_page(request):

    if request.method == "POST":

        email = request.POST["email"]
        password = request.POST["password"]
        print(email + " " + password)
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({
                "status": "Success",
                "reason": "Login successful. You will be redirected to the index page soon."
            }) 
        else:
            return JsonResponse({
                "status": "Fail",
                "reason": "Email or password is wrong."
            })

    return render(request, "instagif/login.html")

def signup_page(request):
    if request.method == "POST":

        name = request.POST["name"]
        email = request.POST["email"]
        avatar = request.FILES["avatar"]
        password = request.POST["password"]

        check_if_already_exists = User.objects.filter(username=email).exists()
        if check_if_already_exists:
            return JsonResponse({
                "status": "Fail",
                "reason": "Email address is alrady in use.",
            })
        else:
            user =  User.objects.create_user(username=email, first_name=name, password=password)
            person = Person(user=user, email=email, name=name, avatar=avatar)
            person.save()

            login(request, user)
            return JsonResponse({
                "status": "Success",
                "reason": "Registered successfully. You will be redirected to the index page soon."
            })

    else:
        return render(request, "instagif/signup.html")

def api_logout(request):
    if request.method == "POST":
        logout(request)
        return redirect("instagif:index")
    else:
        return HttpResponse("FORBIDDEN: Logout access must be by a POST request.")

def api_like(request, image_id):
    if request.method == "POST":
        user = request.user

        liked_image = LikedImage.objects.filter(image_id=image_id)
        liked_image_by_user = liked_image.filter(user=user)
        like_count = liked_image.count()

        if liked_image_by_user.count() > 0:
            obj = liked_image.first()
            obj.delete()

            status = "Done"
            liked = False
            like_count -= 1

        else:
            obj = LikedImage(image_id=image_id, user=user)
            obj.save()

            status = "Done"
            liked = True
            like_count += 1

        return JsonResponse({
                "status": status,
                "liked": liked,
                "like_count": like_count
            })
            
    else:
        return HttpResponse("FORBIDDEN: Like access must be by a POST request.")

def api_save(request, image_id):
    if request.method == "POST":
        user = request.user
        saved_image = SavedImage.objects.filter(user=user, image_id=image_id)

        if saved_image.count() > 0:
            obj = saved_image.first()
            obj.delete()

            status = "Done"
            saved = False

        else:
            obj = SavedImage(user=user, image_id=image_id)
            obj.save()

            status = "Done"
            saved = True

        return JsonResponse({
                "status": status,
                "saved": saved
            })
    else:
        return HttpResponse("FORBIDDEN: Save access must be by a POST request.")

def api_comment(request):
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        person = Person.objects.get(user=user)
        image_id = request.POST["image_id"]
        content = request.POST["content"]

        comment = CommentImage(user=user, image_id=image_id, content=content)
        comment.save()

        comment_count = CommentImage.objects.filter(image_id=image_id).count()

        return JsonResponse({
            "status": "Done",
            "comment_id": comment.id,
            "content": content,
            "date_created": comment.date_created.strftime("%d %b %Y %H %M %S"),
            "name": person.name,
            "avatar": person.avatar.url,
            "comment_count": comment_count
        })


    else:
        return HttpResponse("FORBIDDEN: Comment access must be by a POST request.")

def api_follow(request, following_id):
    if request.method == "POST":
        user = request.user
        following_obj = Following.objects.filter(user=user, following_id=following_id)
        is_already_following = following_obj.exists()

        if is_already_following:
            following_obj.delete()
            is_following = False
        else:
            new_following_obj = Following(user=user, following_id=following_id)
            new_following_obj.save()
            is_following = True
        
        return JsonResponse({
            "status": "Done",
            "message": "Successfully follow/unfollow.",
            "is_following": is_following
        })
    else:
        return JsonResponse({
            "status": "ERROR",
            "message": "Forbidden method.",
            "is_following": False
        })

def api_edit_profile(request):
    if request.method == "POST":
        if request.is_ajax() ==  False:
            return JsonResponse({
                "status": "ERROR",
                "message": "Request must be made with ajax!"
            })

        user = request.user
        person = Person.objects.get(user=user)

        new_name = request.POST["input_name"]
        new_email = request.POST["input_email"]
        password_checkbox = str_to_bool(request.POST["input_password_checkbox"]) # convert JS 'false' to False bool
    
        person.name = new_name
        person.email = new_email
        if "input_avatar" in request.FILES:
            person.avatar = request.FILES["input_avatar"]
        person.save()

        # check if change-password-checkbox is selected or not
        if password_checkbox:
            if ("input_old_password" in request.POST) and ("input_new_password" in request.POST) and ("input_new_password_confirm" in request.POST):
                old_password = request.POST["input_old_password"]
                new_password = request.POST["input_new_password"]
                new_password_confirm = request.POST["input_new_password_confirm"]

                password_match = user.check_password(old_password)

                if password_match == False:
                    return JsonResponse({
                        "status": "ERROR",
                        "messege": "ERROR: old password is incorrect!"
                        })

                if new_password != new_password_confirm:
                    return JsonResponse({
                        "status": "ERROR",
                        "messege": "ERROR: new password confirmation doesn't match!"
                        })

                user.set_password(new_password)
                user.username = new_email
                user.first_name = new_name
                user.save()

                login(request, user)

                return JsonResponse({
                    "status": "SUCCESS",
                    "message": "Profile has been successfully updated!"
                })

            else:
                return HttpResponse("ERROR: password inputs must be filled!")       

        user.username = new_email
        user.first_name = new_name
        user.save()

        return JsonResponse({
            "status": "SUCCESS",
            "message": "Profile has been successfully updated!"
        })
    else:
        return HttpResponse("ERROR: Post method and XMLHTTPRequest header are expected!")





