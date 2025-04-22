import { useState } from "react";
import FootballPitch from "./components/FootballPitch";
import FormationLayer from "./components/layers/Foramation/FormationLayer";

const mockPlayers = [
  { x: 10, y: 50, team: "home" },
  { x: 30, y: 30, team: "home" },
  { x: 30, y: 70, team: "home" },
  { x: 70, y: 50, team: "away" },
  { x: 90, y: 30, team: "away" },
  { x: 90, y: 70, team: "away" },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h1>Football Pitch</h1>
        <FootballPitch
          width={800}
          height={500}
          grassColor="#007A57"
          lineColor="#032"
          lineWidth={2}
          showCenterCircle={true}
          showCornerArcs={true}
          showPenaltySpots={true}
        >
          <FormationLayer
            formation="4-1-2-1-2"
            isHomeTeam={true}
          />
          <FormationLayer
            formation="3-4-3"
            isHomeTeam={false}
            goalkeeperColor="#000"
          />
        </FootballPitch>
      </div>
    </>
  );
}

export default App;
