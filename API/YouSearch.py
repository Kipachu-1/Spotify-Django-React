import requests
api_key = 'AIzaSyA5BaTdP3HNpvncJ2lBlOhJzSHupWAMS-Y'
base_url = 'https://www.googleapis.com/youtube/v3/search'

def search(query):
    params = {
    'part': 'snippet',
    'q': query,
    'key': api_key,
    'order':'viewCount',
    'videoCategory':'10',
    'maxResults': '20',
    }
    response = requests.get(base_url, params=params)
    return response.json()