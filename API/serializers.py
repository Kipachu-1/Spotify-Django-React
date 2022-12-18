from rest_framework import serializers
from . import models

class TrackSerializer(serializers.ModelSerializer):
    singer = serializers.CharField(source='artist.name')
    artist_id = serializers.IntegerField(source='artist.pk')
    artist_uniid = serializers.CharField(source='artist.uni_id')
    musicSrc = serializers.ImageField(source='track')
    cover = serializers.ImageField(source='thumnail')
    
    class Meta:
        model = models.Track
        fields = ['name', 'musicSrc', 'cover', 'singer', 'id', 'uni_id', 'artist_uniid', 'artist_id']
        
class TrackFullSerializer(serializers.ModelSerializer):
    singer = serializers.CharField(source='artist.name')
    artist_thumnail = serializers.ImageField(source='artist.avatar')
    musicSrc = serializers.ImageField(source='track')
    cover = serializers.ImageField(source='thumnail')
    class Meta:
        model = models.Track
        fields = ['name', 'musicSrc', 'cover', 'singer', 'artist_thumnail', 'id']  
        

class PlaylistListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Playlist
        fields = ['name', 'thumnail', 'uni_id', 'pk']


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(read_only=True, many=True)
    class Meta:
        model = models.Playlist
        fields = ['name', 'thumnail', 'description','uni_id', 'tracks']
        


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
        
        
