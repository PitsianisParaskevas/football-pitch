import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";
import heatmapData from "./components/layers/HeatMap/data/heatmap.json";
import "./App.css"; // ✅ Corrected import
import TeamFormationLayer from "./components/layers/TeamFormation/TeamFormationLayer";

function App() {
  return (
    <div className="wrapper">
      <div>
        <h2>DrawPitch</h2>
        <DrawPitch
          width={800}
          height={500}
          orientation="horizontal"
          grassColor="#007A57"
          lineColor="#fff"
          lineWidth={3}
          goalPostColor="#fff"
          cornerR={3}
        ></DrawPitch>
      </div>
    </div>
  );
}

export default App;
