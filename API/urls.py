from django.urls import path
from . import views

urlpatterns = [
    path('list', views.PlaylistList.as_view()),
    path('playlist/<int:pk>', views.PlaylistInfo.as_view()),
    path('track/<int:pk>', views.TrackInfo.as_view()),
    path('artist/<int:pk>', views.ArtistInfo.as_view()),
]
