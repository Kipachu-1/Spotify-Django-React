from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken import views as resviews
urlpatterns = [
    path('list', views.PlaylistList.as_view()),
    path('playlist/<int:pk>', views.PlaylistInfo.as_view()),
    path('track/<int:pk>', views.TrackInfo.as_view()),
    path('artist/<int:pk>', views.ArtistInfo.as_view()),
    path('search/<str:query>', views.search),
    path('playlist/add/track', views.addTrackPlaylist),
    path('token-auth/', views.CustomAuthToken.as_view()),
    path('register/', views.login),
    path('user/playlist/', views.UserPlaylist.as_view()),
    path('user/playlist/addcreate/', views.UserPlaylist.as_view()),
    path('user/playlist/add/track/', views.TrackPlaylist.as_view()),
    path('user/likedTracks/add/', views.UserLikedTracks.as_view()),
]
