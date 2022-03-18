from django.shortcuts import render
from django.http import HttpResponse, FileResponse, request
# Create your views here.

def index(request):
    return render(request, "personal/index2.html")

