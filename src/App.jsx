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
        >
          <TeamFormationLayer
            color="#3333cc"
            radius={8}
            formation="4-4-2"
            isHomeTeam={true}
            fullPitch={false}
          />
          <HeatmapLayer
            data={heatmapData.heatmap}
            color="#F7A82D"
            radius={10}
            opacity={0.5}
          />
        </DrawPitch>
        {/* <TeamFormation formation="4-3-3" isHomeTeam={false} />  */}
        {/* </DrawPitch> */}
      </div>
    </div>
  );
}

export default App;
