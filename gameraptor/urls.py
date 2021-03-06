from django.urls import path, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


app_name = "gameraptor"
urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name="index"),
    re_path(r'.*', TemplateView.as_view(template_name='index.html'), name="redirect_index"),
    path('test', views.test, name="test")
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)