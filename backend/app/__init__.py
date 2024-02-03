from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

app.config.from_object('config.Config')
db = SQLAlchemy(app)

from app.routes.main import main
app.register_blueprint(main)

from .models.music_chart import MusicChart