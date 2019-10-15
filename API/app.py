from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import logging

from src.library import GetBook, Login

app = Flask(__name__)
app.debug = True
api = Api(app)
CORS(app)

logging.basicConfig(level = logging.INFO)

api.add_resource(GetBook, "/GetBook/<int:bookId>")
api.add_resource(Login, "/Login/")

if __name__ == "__main__":
  app.run()