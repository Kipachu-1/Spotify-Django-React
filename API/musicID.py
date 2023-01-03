import string
import random

def music_id():
    characterList = ''
    characterList += string.ascii_letters
    characterList += string.digits
 
    id = []
    for i in range(20):
        randomchar = random.choice(characterList)
        
        id.append(randomchar)
    id = "".join(id)
    return id

def playlist_id():
    characterList = ''
    characterList += string.ascii_letters
    characterList += string.digits
 
    id = []
    for i in range(20):
        randomchar = random.choice(characterList)
        
        id.append(randomchar)
    id = "".join(id)
    return id 

def UserID():
    characterList = ''
    characterList += string.ascii_letters
    characterList += string.digits
 
    id = []
    for i in range(20):
        randomchar = random.choice(characterList)
        id.append(randomchar)
    id = "".join(id)
    return id 