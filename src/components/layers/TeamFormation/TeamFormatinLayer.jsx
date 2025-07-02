import { useContext } from "react";
import { PitchContext } from "../../DrawPitch/DrawPitch";
import calculateTotalPlayerFromFormation from "../utils/calculateTotalPlayerFromFormation";
import calculatePitchSize from "../utils/calculatePitchSize";

export default function TeamFormationLayer({
  color = "#FF4444",
  radius = 8,
  formation = "4-3-3",
  isHomeTeam = true,
  fullPitch = false,
}) {
  const { width, height, orientation } = useContext(PitchContext);

  const formationParts = calculateTotalPlayerFromFormation(formation);
  const size = calculatePitchSize(
    width,
    height,
    orientation,
    fullPitch,
    formationParts
  );

  const axisX = size.axisX;
  const axisY = size.axisY;
  const zoneX = size.zoneX;

  const playersHorizontal = {
    GK: {
      cx: 62.5,
      cy: 250,
      r: radius,
      color: color,
    },
  };

  const playersVertical = {
    GK: {
      cx: 250,
      cy: 62.5,
      r: radius,
      color: color,
    },
  };

  const players =
    orientation === "horizontal" ? playersHorizontal : playersVertical;

  // console.log("players", players.GK.cx);

  return (
    <>
      <circle
        cx={players.GK.cx}
        cy={players.GK.cy}
        r={players.GK.r}
        fill={players.GK.color}
      />
    </>
  );
}
