from flask import Blueprint
from .music_charts import get_music_charts, import_music_charts

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return "Hello, world!"

main.add_url_rule('/music-charts', 'get_music_charts', get_music_charts)
main.add_url_rule('/import-music-charts', 'import_music_charts', import_music_charts)