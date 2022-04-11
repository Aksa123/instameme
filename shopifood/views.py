from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, FileResponse, request


def index(request):
    return HttpResponse("ashjdjsah")