import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";
import heatmapData from "./components/layers/HeatMap/data/heatmap.json";
import "./App.css"; // ✅ Corrected import

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <DrawPitch width="600" height="400" />
    </div>
  );
}

export default App;
