import { useState } from "react";
import FootballPitch from "./components/FootballPitch/FootballPitch";
import FormationLayer from "./components/layers/Foramation/FormationLayer";
import HeatmapLayer from "./components/layers/HeatMap/HeatmapLayer";

import heatmapData from "./components/layers/HeatMap/data/heatmap.json";

// https://www.sofascore.com/football/match/cagliari-fiorentina/Tdbsueb#id:13797484
// Lucas Beltran heatmap

function App() {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      {/* Horizontal Pitch (Default) */}
      <div>
        <h2>Horizontal Pitch</h2>
        <FootballPitch
          width={800}
          height={500}
          direction="horizontal"
          grassColor="#007A57"
          lineColor="#032"
          lineWidth={2}
          showCenterCircle={true}
          showCornerArcs={true}
          showPenaltySpots={true}
        >
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
        </FootballPitch>
      </div>

      {/* Vertical Pitch */}
      {/* <div>
        <h2>Vertical Pitch</h2>
        <FootballPitch
          width={500}
          height={800}
          direction="vertical"
          grassColor="#007A57"
          lineColor="#032"
          lineWidth={2}
          showCenterCircle={true}
          showCornerArcs={true}
          showPenaltySpots={true}
        >
          <FormationLayer
            formation="4-4-2"
            isHomeTeam={true}
            direction="vertical"
          />
          <FormationLayer
            formation="4-3-3"
            isHomeTeam={false}
            direction="vertical"
          />
        </FootballPitch>
      </div> */}
    </div>
  );
}

export default App;
