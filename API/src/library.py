from flask_restful import Resource
from pymongo import MongoClient
from flask import request

class GetBooks(Resource):
    def get(self):
        return {'name': 'A', 'price': 10000, 'author': 'David'}, 200