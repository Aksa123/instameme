from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = "instagif"
urlpatterns = [
    path('', views.index, name="index"),
    path('admin/', views.admin_home, name="admin_home"),
    path('admin/<str:menu>/', views.admin, name="admin"),
    path('admin/user/edit/<int:id>/', views.admin_user_edit, name="admin_user_edit"),
    path('admin/user/delete/<int:id>/', views.admin_user_delete, name="admin_user_delete"),
    path('admin/user/create/', views.admin_user_create, name="admin_user_create"),
    path('admin/tag/edit/<int:id>/', views.admin_tag_edit, name="admin_tag_edit"),
    path('admin/tag/delete/<int:id>/', views.admin_tag_delete, name="admin_tag_delete"),
    path('admin/tag/create/', views.admin_tag_create, name="admin_tag_create"),
    path('admin/image/create/', views.admin_image_create, name="admin_image_create"),
    path('admin/image/edit/<uuid:id>/', views.admin_image_edit, name="admin_image_edit"),
    path('admin/image/delete/<uuid:id>/', views.admin_image_delete, name="admin_image_delete"),
    path('search/tag/<str:tag_name>/', views.search_tag, name="search_tag"),
    path('search/', views.search, name="search"),
    path('detail/<str:id>', views.detail, name="detail"),
    path('detail/user/<int:id>/', views.user_detail, name="user_detail"),
    path('reel/all/', views.reel_all, name="reel_all"),
    # path('reel/<int:user_id>/', views.reel, name="reel"),
    path('reel/<int:user_id>/', views.reel_all, name="reel"),
    path("login/", views.login_page, name="login"),
    path("signup/", views.signup_page, name="signup"),
    path("logout/", views.api_logout, name="logout"),
    path("like/<uuid:image_id>/", views.api_like, name="like"),
    path("save/<uuid:image_id>/", views.api_save, name="save"),
    path("comment/", views.api_comment, name="comment"),
    path("follow/<int:following_id>/", views.api_follow, name="follow" ),
    path("profile/", views.profile, name="profile"),
    path("profile/edit/", views.api_edit_profile, name="edit_profile"),
    path("upload/", views.upload, name="upload"),
    path("download/<str:image_id>/", views.download, name="download"),
    


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)