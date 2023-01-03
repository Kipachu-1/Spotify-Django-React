from django.contrib import admin
from . import models

admin.site.register(models.LikedSongs)
admin.site.register(models.User_Playlists)
admin.site.register(models.Track)
admin.site.register(models.Playlist)
admin.site.register(models.Artist)
admin.site.register(models.Album)
admin.site.register(models.history)
admin.site.register(models.FollowedArtist)
admin.site.register(models.UserSetting)

