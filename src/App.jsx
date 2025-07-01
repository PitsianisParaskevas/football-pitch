import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";
import FormationLayer from "./components/layers/Foramation/FormationLayer";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";
import heatmapData from "./components/layers/HeatMap/data/heatmap.json";
import Vertical from "./components/Vertical/Vertical";
import "./App.css"; // ✅ Corrected import
import Demo from "./components/Demo";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Custom Football Pitch</h2>
      <Demo />

      <h2>Vertical</h2>
      <Demo direction="vertical" />
    </div>
  );
}

export default App;
