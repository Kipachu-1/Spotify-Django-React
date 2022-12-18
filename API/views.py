from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import YouSearch
from . import models
from . import serializers


class TrackList(generics.ListAPIView):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    
class PlaylistList(generics.ListAPIView):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistListSerializer
    
class PlaylistInfo(generics.RetrieveAPIView):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    
class TrackInfo(generics.RetrieveAPIView):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackFullSerializer
    
    
class ArtistInfo(generics.RetrieveAPIView):
    queryset = models.Artist.objects.all()
    serializer_class = serializers.ArtistSerializer
    
    
@api_view(['GET'])
def search(request, query):
    data = YouSearch.search(query)
    return Response(data=data['items'])
