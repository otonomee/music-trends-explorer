// Dashboard.js (located in the /components/Dashboard directory)

import React from 'react';
import './DashboardPage.css'; // Import the dashboard-specific CSS
import TopSongsChart from '../TopSongsChart/TopSongsChart.js';
import TopArtistsTable from '../TopArtistsTable/TopArtistsTable.js';
//import SongLongevityChart from '../SongLongevityChart/SongLongevityChart.js';
//import PeakPositionTrendsChart from '../PeakPositionTrendsChart/PeakPositionTrendsChart.js';
//import ChartWeekVsCurrentWeekChart from '../ChartWeekVsCurrentWeekChart/ChartWeekVsCurrentWeekChart.js';

import { useMusicChartData } from '../../contexts/MusicChartDataProvider'; // Adjust the import path

const Dashboard = () => {
  const { musicChartData, isLoading, error } = useMusicChartData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!musicChartData) {
    return <div>No data</div>;
  }

  return (
    <div className="dashboard">
      <h1>Music Dashboard</h1>
      <div className="charts">
        <TopSongsChart />
        {/* Include other metric components here */}
      </div>
      <div className="tables">
        <TopArtistsTable /> {/* Include the TopArtistsTable component */}
        {/* Include other metric components here */}
      </div>
    </div>
  );
};

export default Dashboard;
