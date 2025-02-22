import json


FILE_NAME = "data/Users.json"

"""
    Loads Users data from JSON file
    
    Returns:
    dict:the Users data.
"""
def load_Users():
    with open(FILE_NAME, 'r') as file:
        return json.load(file)