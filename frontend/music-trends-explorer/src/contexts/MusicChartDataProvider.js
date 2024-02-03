import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MusicChartDataContext = createContext();

export const useMusicChartData = () => useContext(MusicChartDataContext);

export const MusicChartDataProvider = ({ children }) => {
  const [musicChartData, setMusicChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/music-charts");
        console.log("API response:", response.data);
        setMusicChartData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch music chart data:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []); // Empty dependency array ensures this runs once on mount

  console.log("Music chart data:", musicChartData);
  console.log("Loading state:", isLoading);
  console.log("Error:", error);

  return <MusicChartDataContext.Provider value={{ musicChartData, isLoading, error }}>{children}</MusicChartDataContext.Provider>;
};
