from django.shortcuts import render
from django.http import request, HttpResponse, JsonResponse

# Create your views here.


def index(request):

    # return HttpResponse("zzz")
    return render(request, "gameraptor/build/index.html")


def test(request):
    print("visited")
    return JsonResponse({"name": "aksa"})