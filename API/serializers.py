from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class TrackSerializer(serializers.ModelSerializer):
    TrackId = serializers.CharField(source='uni_id')
    class Meta:
        model = models.Track
        fields = ['name', 'thumbnail', 'artist', 'TrackId', 'pk']
        
class TrackFullSerializer(serializers.ModelSerializer):
    singer = serializers.CharField(source='artist.name')
    artist_thumnail = serializers.ImageField(source='artist.avatar')
    musicSrc = serializers.ImageField(source='track')
    cover = serializers.ImageField(source='thumnail')
    class Meta:
        model = models.Track
        fields = ['name', 'musicSrc', 'cover', 'singer', 'artist_thumnail', 'id']  
        

class PlaylistListSerializer(serializers.ModelSerializer):
    creator = serializers.CharField(source='creator.username')
    class Meta:
        model = models.Playlist
        fields = ['name', 'cover', 'uni_id', 'pk', 'creator']


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(read_only=True, many=True)
    creator = serializers.CharField(source='creator.username')
    class Meta:
        model = models.Playlist
        fields = ['name', 'cover', 'description','uni_id', 'tracks', 'creator']
        
              


class TrackArtistSerializer(serializers.HyperlinkedModelSerializer):
    musicSrc = serializers.ImageField(source='track')
    cover = serializers.ImageField(source='thumnail')
    
    class Meta:
        model = models.Track
        fields = ['name', 'musicSrc', 'cover','id', 'uni_id']

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    track = TrackArtistSerializer(many=True, read_only=True)
    class Meta:
        model = models.Artist
        fields = ['name', 'avatar', 'uni_id', 'track']
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
    
    def createUser(self):
        user = User.objects.create(username=self.data['username'], password=self.data['password'])
        token, created = Token.objects.get_or_create(user=user)
        return {
            'token': token.key,
            'user_id': user.pk,
            'uni_id':user.UserSetting.first().uni_id,
        }



class TokenPlaylists(serializers.ModelSerializer):
    class Meta:
        model = models.Playlist
        fields = ['uni_id']


class TokenLikedTracks(serializers.ModelSerializer):
    class Meta:
        model = models.Track
        fields = ['uni_id']
        
        
