from django.shortcuts import render
from django.http import request, HttpResponse, JsonResponse


def index(request):
    
   return render(request, "shopifood/index.html")