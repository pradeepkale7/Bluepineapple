import json


FILE_NAME = "data/Users.json"

def load_Users():
    with open(FILE_NAME, 'r') as file:
        return json.load(file)