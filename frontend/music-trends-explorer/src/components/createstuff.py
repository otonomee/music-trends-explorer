import os

# Define the component names and their respective directories
components = [
    ("TopSongsChart", [
        ("TopSongsChart.js", ""),
        ("TopSongsChart.css", ""),
    ]),
    ("TopArtistsTable", [
        ("TopArtistsTable.js", ""),
        ("TopArtistsTable.css", ""),
    ]),
    ("SongLongevityChart", [
        ("SongLongevityChart.js", ""),
        ("SongLongevityChart.css", ""),
    ]),
    ("PeakPositionTrendsChart", [
        ("PeakPositionTrendsChart.js", ""),
        ("PeakPositionTrendsChart.css", ""),
    ]),
    ("ChartWeekVsCurrentWeekChart", [
        ("ChartWeekVsCurrentWeekChart.js", ""),
        ("ChartWeekVsCurrentWeekChart.css", ""),
    ]),
]

# Create the directories and files
project_dir = os.getcwd()

for component, files in components:
    component_dir = os.path.join(project_dir, "src", "components", component)
    os.makedirs(component_dir, exist_ok=True)
    for file_name, content in files:
        file_path = os.path.join(component_dir, file_name)
        with open(file_path, "w") as file:
            file.write(content)

print("React components and directories created successfully.")
