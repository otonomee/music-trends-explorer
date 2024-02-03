from flask import Blueprint, jsonify
from app import db
import csv
from app.models.music_chart import MusicChart
import requests
from datetime import datetime
from flask_cors import CORS, cross_origin

main = Blueprint('main', __name__)

from flask_cors import cross_origin

@main.route('/music-charts')
@cross_origin()  # This will enable CORS for this route
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

@main.route('/import-music-charts')
def import_music_charts():
    with open('hot-100-current.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            music_chart = MusicChart(
                chart_week=datetime.strptime(row['chart_week'], '%Y-%m-%d'),
                current_week=int(row['current_week']),
                title=row['title'],
                performer=row['performer'],
                last_week=int(row['last_week']),
                peak_pos=int(row['peak_pos']),
                wks_on_chart=int(row['wks_on_chart'])
            )
            db.session.add(music_chart)

    db.session.commit()
    return jsonify({'message': 'Music chart data imported and stored successfully'})