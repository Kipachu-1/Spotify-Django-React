from django.db import models
from django.contrib.auth.models import AbstractUser, User
from . import musicID
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    UserSetting.objects.get_or_create(user=instance, uni_id=musicID.UserID())
    User_Playlists.objects.get_or_create(user=instance, uni_id=musicID.playlist_id())
    if created:
        Token.objects.create(user=instance)

class UserSetting(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='UserSetting')
    uni_id = models.CharField(max_length=100)
    
    
class Artist(models.Model):
    name = models.CharField(max_length = 100)
    uni_id = models.CharField(max_length = 20)
    monthly_listeners = models.IntegerField()
    avatar = models.ImageField(upload_to='images/')
    created = models.DateTimeField(auto_now_add=True)

class Track(models.Model):   
    artist = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    track = models.FileField(upload_to='tracks/', null=True, blank=True)
    uni_id = models.CharField(max_length=20, null=True, default=musicID.music_id())
    thumbnail = models.URLField()
    genre = models.CharField(max_length=30, default='song')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self) -> str:
        return self.name

class LikedSongs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tracks = models.ManyToManyField(Track)
    uni_id = models.CharField(max_length=30)
    
class FollowedArtist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artists = models.ManyToManyField(Artist)
    uni_id = models.CharField(max_length=30)    
    
    
class Playlist(models.Model):
    creator = models.ForeignKey(User, on_delete=models.PROTECT)
    name = models.CharField(max_length=100, default='My playlist', unique=False)
    description = models.TextField(max_length=200, null=True)
    tracks = models.ManyToManyField(Track)
    public = models.BooleanField(default=True)
    uni_id = models.CharField(max_length=30, null=True)
    cover = models.ImageField(default="images\R_Fjojo2y.jpg", upload_to='images/', null=True)
    
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    

class User_Playlists(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    playlists = models.ManyToManyField(Playlist)
    uni_id = models.CharField(max_length=30, null=True)
    
class Album(models.Model):
    author = models.CharField(max_length=100)
    tracks = models.ManyToManyField(Track)
    description = models.TextField(max_length=200)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
class history(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    last_playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, null=True)
    last_track = models.ForeignKey(Track, on_delete=models.CASCADE, null=True)
    












