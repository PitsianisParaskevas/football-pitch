import { useState } from "react";
import FootballPitch from "./components/FootballPitch";

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
          {/* child layers here */}
        </FootballPitch>
      </div>
    </>
  );
}

export default App;
