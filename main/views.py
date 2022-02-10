from django.shortcuts import render
from django.http import request, HttpResponse


def index(request):
    # cells = []
    # for i in range(1, 151):
    #     cells.append(i)

    programs = []
    for i in range(1, 30):
        programs.append(i)

    return render(request, "main/index3.html", context={"programs": programs})


