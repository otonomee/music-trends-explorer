import React, { useContext } from 'react';
import { useMusicChartData } from '../../contexts/MusicChartDataProvider'; // Adjust the import path

const TopArtistsTable = () => {
  const { musicChartData, isLoading, error } = useMusicChartData(); // Use the hook to access the context

  if (isLoading || error) {
    // Handle loading state or errors here
    return null;
  }

  // Extract the relevant data from musicChartData
  const topArtistsData = musicChartData.map((item) => ({
    artist: item.performer,
    peakPosition: item.peak_pos,
    weeksOnChart: item.wks_on_chart,
  }));

  // Render the table using topArtistsData
  return (
    <div className="top-artists-table">
      <h2>Top Artists</h2>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Peak Position</th>
            <th>Weeks on Chart</th>
          </tr>
        </thead>
        <tbody>
          {topArtistsData.map((artistData, index) => (
            <tr key={index}>
              <td>{artistData.artist}</td>
              <td>{artistData.peakPosition}</td>
              <td>{artistData.weeksOnChart}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopArtistsTable;
