import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";
import heatmapData from "./components/layers/HeatMap/data/heatmap.json";
import "./App.css"; // ✅ Corrected import
import TeamFormation from "./components/layers/TeamFormation/TeamFormationLayer";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <DrawPitch width="800" height="500">
        <HeatmapLayer data={heatmapData.heatmap} />
      </DrawPitch>

      <DrawPitch width="800" height="500" orientation="vertical">
        <HeatmapLayer data={heatmapData.heatmap} />
      </DrawPitch>
    </div>
  );
}

export default App;
