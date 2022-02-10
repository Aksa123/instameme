from django.shortcuts import render
from django.http import request, HttpResponse

# Create your views here.

def home(request):
    app_list = []
    for i in range(0, 50):
        app_list.append(i)
    return render(request, "android/home.html", context={"app_list": app_list})