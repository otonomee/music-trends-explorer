// App.js
import React from "react";
import DashboardPage from "./components/DashboardPage/DashboardPage.js";
import { MusicChartDataProvider } from "./contexts/MusicChartDataProvider.js";

// import App.css
import "./App.css";

function App() {
  return (
    
      <MusicChartDataProvider>
        <DashboardPage />
        {/* other components */}
      </MusicChartDataProvider>
    
  );
}

export default App;