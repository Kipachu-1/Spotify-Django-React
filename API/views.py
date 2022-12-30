from rest_framework import generics, status
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from . import YouSearch
from . import models
from . import serializers
from . import musicID

class TrackList(generics.ListAPIView):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    
class PlaylistList(generics.ListAPIView):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistListSerializer
    
class PlaylistInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    
class TrackInfo(generics.RetrieveAPIView):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackFullSerializer
    
    
class ArtistInfo(generics.RetrieveAPIView):
    queryset = models.Artist.objects.all()
    serializer_class = serializers.ArtistSerializer
   
   
class UserPlaylist(APIView):
    authentication_classes = [TokenAuthentication]
    def get(self, request, format=None):
        playlists = models.User_Playlists.objects.get(user=request.user).playlists.all()
        serializer = serializers.PlaylistListSerializer(data=playlists, many=True,  context={'request': request})
        serializer.is_valid()
        return Response(data={'playlists':serializer.data})

    def post(self, request, format=None):
        data = request.data
        if data['action'] == 'create':
            playlist = models.Playlist.objects.create(uni_id=musicID.playlist_id(),name=data['name'],
                                                      creator=request.user, cover=data['cover'], description=data['description'])
            models.User_Playlists.objects.get(user=request.user).playlists.add(playlist)  
            return Response(data={'message': 'OK'})
        elif data['action'] == 'add':
            playlist = models.Playlist.objects.get(uni_id=data['playlist_id'])
            models.User_Playlists.objects.get(user=request.user).playlists.add(playlist)  
            return Response(data={'message': 'OK'})
              

class TrackPlaylist(APIView):
    
    
    
    def post(self, request, format=None):
        data = request.data
        playlist = models.Playlist.objects.get(uni_id=data['playlist_id'])
        track = models.Track.objects.get_or_create(uni_id=data['id'], name=data['name'], thumbnail=data['cover'], artist=data['artist'])
        playlist.tracks.add(models.Track.objects.get(uni_id=data['id']))
        return Response(data={'message': 'OK'})
        
        
    
    
    
    
class UserLikedTracks(APIView):
    authentication_classes = [TokenAuthentication]  
    def get(self, request, format=None):
        liked_songs = models.LikedSongs.objects.get(user=request.user).tracks.all()
        serializersongs = serializers.TrackSerializer(data=liked_songs, many=True)
        serializersongs.is_valid()
        
    def post(self, request, format=None):
        data = request.data
        track = models.Track.objects.get_or_create(uni_id=data['id'], name=data['name'], thumbnail=data['cover'], artist=data['artist'])
        liked_songs = models.LikedSongs.objects.get(user=request.user).tracks
        liked_songs.add(models.Track.objects.get(uni_id=data['id']))
        return Response({'message':'OK'})

            
        
 
 
 
    
class UserRegister(APIView):
    def post(self,request, format=None):
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.createUser()
            return Response({'message': 'created', 'data':user_data})
        return Response({'message': 'not new'})
    
 
@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user == None:
        return Response({'message':'invalid data'})
    token, created = Token.objects.get_or_create(user=user)
    return Response(data={
                'token': token.key,
                'user_id': user.pk,
                'uni_id':user.UserSetting.first().uni_id,
            })
    
@api_view(['GET'])
def search(request, query):
    data = YouSearch.search(query)
    return Response(data=data['items'])



@api_view(['POST'])
def addTrackPlaylist(request):
    data = request.data
    track = models.Track.objects.get_or_create(uni_id=data['id'],name=data['name'], thumbnail=data['cover'], artist=data['artist'])
    playlist = models.Playlist.objects.get(id=1)
    playlist.tracks.add(models.Track.objects.get(uni_id=data['id']))
    return Response({'message':'OK'})



    

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'uni_id':user.UserSetting.first().uni_id,
        })