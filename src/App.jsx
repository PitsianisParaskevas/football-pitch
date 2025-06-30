import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";
import FormationLayer from "./components/layers/Foramation/FormationLayer";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";
import heatmapData from "./components/layers/HeatMap/data/heatmap.json";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Custom Football Pitch</h2>
      <DrawPitch width={800} height={500}>
        {/* <HeatmapLayer
          data={heatmapData.heatmap}
          width={800}
          height={500}
          direction="horizontal"
          color="orange"
          radius={10}
          opacity={0.4}
        /> */}
        {/* <FormationLayer formation="4-4-2" isHomeTeam={true} />
        <FormationLayer formation="4-3-3" isHomeTeam={false} /> */}
      </DrawPitch>
    </div>
  );
}

export default App;
