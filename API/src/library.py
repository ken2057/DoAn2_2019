from src.configs import *
from datetime import datetime, timedelta
from flask_restful import Resource
from pymongo import MongoClient
from flask import request
from pymongo import MongoClient
from uuid import uuid4
from flask import jsonify
import logging

## Global varible
client = MongoClient(mongodb)
db = client.library

## Check token expired or not
def checkToken(token):
	r = db.token.find_one({'_id': token})
	if r != None:
		if r['expires'] > datetime.now():
			return True
		db.token.delete_one({'_id': token})
	return False

## Check json from post method is enought field require for that func
def checkJsonValid(valid, json):
	for i in valid:
		if i not in json:
			return False
	return True

## Get book information
class GetBook(Resource):
	def get(self, bookId):
		return db.bookTitle.find_one({'_id': bookId}), 200

## Login and return token
class Login(Resource):
	def findUser(self, username, password):
		return db.account.find_one({'_id': username, 'password': password})

	def createToken(self, account):
		token = str(uuid4()).replace('-','')
		db.token.insert_one(
			{
				'_id': token, 
				'expires': datetime.now() + timedelta(seconds = tokenExpireTime),
				'username': account['_id'],
				'role': account['role']
			}
		)
		return token

	def post(self):
		try:
			json = request.get_json()
			valid = ['username', 'password']
			if (checkJsonValid(valid, json)):
				account = self.findUser(json['username'], json['password'])
				if(account != None):
					token = self.createToken(account)
					return { 'token': token, 'expires': tokenExpireTime }, 200
				return 401, 401
			return 400, 400
		except Exception as e:
			logging.info('error login: %s',e)
		return 404, 404

