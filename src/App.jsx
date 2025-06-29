import React from "react";
import DrawPitch from "./components/DrawPitch/DrawPitch";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Custom Football Pitch</h2>
      <DrawPitch
        width={1500}
        height={1000}
        direction="horizontal" // or "vertical"
        grassColor="#007A57"
        lineColor="#fff"
        lineWidth={2}
        showCenterCircle={true}
        showCornerArcs={true}
        showPenaltySpots={true}
        showPenaltyArea={true}
        showGoalArea={true}
        showGoalposts={true}
      />
    </div>
  );
}

export default App;
