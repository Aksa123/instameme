from django.http.response import JsonResponse
from .models import Person

def is_admin(func):
    def check(request, **kwargs):
        if request.user.is_authenticated:
            person = Person.objects.get(user=request.user)
            if person.is_admin == True:
                print("correct")
                return func(request, **kwargs)
            else:
                return JsonResponse({
                    "status": "ERROR",
                    "message": "You are not authorized to access this page!"
                })
                
        else:
            return JsonResponse({
                "status": "ERROR",
                "message": "You are not authorized to access this page!"
            })
    
    return check