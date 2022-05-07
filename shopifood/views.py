from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, FileResponse, request
import requests
import json

def index(request):

    game_rawg_api_key = "84350cd8a8a7472a8cbc7dc14aa547b3"

    url = "https://api.rawg.io/api/games?key="+game_rawg_api_key+"&page_size=1"

    headers = {
        "Content-type": "application/json",
    }

    response = requests.request("GET", url, headers=headers)

    response_dict = json.loads(response.text)
    return JsonResponse(response_dict)
