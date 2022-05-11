from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = "instagif"
urlpatterns = [
    path('', views.index, name="index"),
    path('test', views.test, name="gameraptor_test")
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)