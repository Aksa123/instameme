from django.shortcuts import render
from django.http import request, HttpResponse
import requests
import xmltodict, json
from pprint import pprint, pformat

# Create your views here.

def index(request):

    id = 4658
    # url = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=4658/4199/11608" #"https://cdn.animenewsnetwork.com/encyclopedia/reports.xml?id=143&type=anime&nlist=10"
    # response = requests.get(url)
    
    # obj = xmltodict.parse(response.text)
    # obj_json = json.dumps(obj)
    # obj_json_load = json.loads(obj_json)
    # # pprint(obj_json_load, indent=4)
    # pprint (obj_json_load, indent=4)


    # url = "http://www.omdbapi.com/?i=tt3896198&apikey=bda09356" + "&s=&type=movie&page=3"
    # resp = requests.get(url)
    # resp_obj = json.loads(resp.text)
    # pprint(resp_obj, indent=4)
    
    # GIPHY
    api_key = "cM1matAF3fba5KWoB6ceGic0qavk36H4"
    limit = 5
    bundle = "low_bandwidth"

    gif_url = "https://api.giphy.com/v1/gifs/trending" + "?api_key=" + api_key + "&limit=" + str(limit) + "&bundle=" + bundle
    resp = requests.get(gif_url)
    resp_obj = json.loads(resp.text)
    pprint(resp_obj, indent=4)
    bruh = pformat(resp_obj, indent=4)

    return HttpResponse(bruh) # HttpResponse(obj_json["@report"]["item"]["anime_manga"])