import csv
import sqlite3
from datetime import datetime

# Connect to the SQLite database
conn = sqlite3.connect('site.db')
cur = conn.cursor()

# Create the table if it doesn't exist
cur.execute('''
    CREATE TABLE IF NOT EXISTS music_charts(
        _id INTEGER PRIMARY KEY,
        chart_week TEXT,
        current_week INTEGER,
        title TEXT,
        performer TEXT,
        last_week INTEGER,
        peak_pos INTEGER,
        wks_on_chart INTEGER
    )
''')

# Open the CSV file and insert each row into the database
with open('hot-100-current.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        cur.execute('''
            INSERT INTO music_charts(_id, chart_week, current_week, title, performer, last_week, peak_pos, wks_on_chart) 
            VALUES(NULL, :chart_week, :current_week, :title, :performer, :last_week, :peak_pos, :wks_on_chart)
        ''', row)

# Commit the changes and close the connection
conn.commit()
conn.close()