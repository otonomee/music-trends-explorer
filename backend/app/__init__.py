from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

app.config.from_object('config.Config')
db = SQLAlchemy(app)

@app.route('/music-charts', methods=['GET'])
def get_music_charts():
    music_charts = MusicChart.query.all()
    return jsonify([{
        'chart_week': music_chart.chart_week,
        'current_week': music_chart.current_week,
        'title': music_chart.title,
        'performer': music_chart.performer,
        'last_week': music_chart.last_week,
        'peak_pos': music_chart.peak_pos,
        'wks_on_chart': music_chart.wks_on_chart
    } for music_chart in music_charts])

# from app.routes.app import main
# app.register_blueprint(main)

from .models.music_chart import MusicChart