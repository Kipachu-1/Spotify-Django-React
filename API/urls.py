from django.urls import path
from . import views
from rest_framework.authtoken import views as resviews
urlpatterns = [
    path('list', views.playlist_list_view),
    path('Tlist', views.TrackList.as_view()),
    path('playlist/<int:pk>', views.playlist_info_view),
    path('track/<int:pk>', views.TrackInfo.as_view()),
    path('artist/<int:pk>', views.ArtistInfo.as_view()),
    path('search/<str:query>', views.search),
    path('token-auth/', views.CustomAuthToken.as_view()),
    path('register/', views.login),
    path('user/playlist/', views.UserPlaylist.as_view()),
    path('user/playlist/addcreate/', views.UserPlaylist.as_view()),
    path('user/playlist/add/track/', views.TrackPlaylist.as_view()),
    path('user/likedTracks/add/', views.UserLikedTracks.as_view()),
    path('user/likedTracks/', views.UserLikedTracks.as_view()),
    path('user/medata/', views.MeData.as_view()),
    path('file/', views.FileUploadView.as_view()),
]
