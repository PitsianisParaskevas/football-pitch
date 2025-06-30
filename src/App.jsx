import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";
import FormationLayer from "./components/layers/Foramation/FormationLayer";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";
import heatmapData from "./components/layers/HeatMap/data/heatmap.json";
import Vertical from "./components/Vertical/Vertical";
import "./App.css"; // ✅ Corrected import

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Custom Football Pitch</h2>
      <DrawPitch width={800} height={500} />

      <h2>Vertical</h2>
      <Vertical direction="vertical" />
    </div>
  );
}

export default App;
