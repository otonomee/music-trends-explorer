from app import db

class MusicChart(db.Model):
    __tablename__ = 'music_charts'  # specify the table name
    _id = db.Column(db.Integer, primary_key=True)
    chart_week = db.Column(db.Date)
    current_week = db.Column(db.Integer)
    title = db.Column(db.String(100))
    performer = db.Column(db.String(100))
    last_week = db.Column(db.Integer)
    peak_pos = db.Column(db.Integer)
    wks_on_chart = db.Column(db.Integer)

    def __repr__(self):
        return f'<MusicChart {self.title} by {self.performer}>'