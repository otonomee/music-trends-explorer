import React, { useContext } from "react";
import { MusicChartDataContext } from "../contexts/MusicChartDataProvider";

const TopArtistsTable = ({ criteria }) => {
  const { musicChartData, isLoading, error } = useContext(MusicChartDataContext);

  if (isLoading || error) {
    // Handle loading state or errors here
    return null;
  }

  // Extract the relevant data from musicChartData
  const topArtistsData = musicChartData
    .map((item) => ({
      artist: item.performer,
      peakPosition: item.peak_pos,
      weeksOnChart: item.wks_on_chart,
    }))
    .sort((a, b) => {
      if (criteria === "peakPosition") {
        return a.peakPosition - b.peakPosition;
      } else if (criteria === "weeksOnChart") {
        return b.weeksOnChart - a.weeksOnChart;
      }
      return 0;
    })
    .slice(0, 10); // Get the top 10 artists

  // Render the table using topArtistsData
  return (
    <div className="top-artists-table">
      <h2>Top 10 Artists ({criteria})</h2>
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
