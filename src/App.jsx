import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";
import FormationLayer from "./components/layers/Foramation/FormationLayer";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";
import heatmapData from "./components/layers/HeatMap/data/heatmap.json";
import Vertical from "./components/Vertical/Vertical";
import "./App.css"; // ✅ Corrected import
import Demo from "./components/DrawPitch copy/Demo";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Custom Football Pitch</h2>
      <Demo width="1000" height="600">
        {/* <FormationLayer formation="4-4-2" isHomeTeam={true} />
        <FormationLayer formation="4-3-3" isHomeTeam={false} /> */}
        <HeatmapLayer
          data={heatmapData.heatmap}
          width={800}
          height={500}
          direction="horizontal"
          color="orange"
          radius={10}
          opacity={0.4}
        />
      </Demo>

      <h2>Vertical</h2>
      <Demo orientation="vertical">
        {/* <FormationLayer formation="4-3-3" isHomeTeam={false} />
          <FormationLayer formation="4-3-3" isHomeTeam={false} /> */}
      </Demo>
    </div>
  );
}

export default App;
