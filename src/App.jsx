import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";
import heatmapData from "./components/layers/HeatMap/data/heatmap.json";
import "./App.css"; // ✅ Corrected import
import TeamFormation from "./components/layers/TeamFormation/TeamFormatin";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <DrawPitch width="600" height="400">
        <TeamFormation
          formation="4-3-3"
          isHomeTeam={false}
          color="#3366FF"
          radius={10}
        />
      </DrawPitch>
    </div>
  );
}

export default App;
