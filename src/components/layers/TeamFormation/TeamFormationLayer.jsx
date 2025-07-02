import { useContext } from "react";
import { PitchContext } from "../../DrawPitch/DrawPitch";
import calculateTotalPlayerFromFormation from "../utils/calculateTotalPlayerFromFormation";
import calculatePitchSize from "../utils/calculatePitchSize";

export default function TeamFormationLayer({
  color,
  radius = 8,
  formation,
  isHomeTeam = true,
  fullPitch = false,
  verticalSpacingRatio = 1.5,
}) {
  const teamColor = color || (isHomeTeam ? "#3366FF" : "#FF4444"); // blue for home, red for away

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

  const diameter = radius * 2;
  const zones = isHomeTeam ? formationParts : [...formationParts].reverse();

  const players = [];

  for (let i = 0; i < zones.length; i++) {
    const numPlayers = zones[i];

    // const cx = zoneX * i + zoneX / 2 - radius + (isHomeTeam ? 0 : axisX);
    const offsetX = isHomeTeam
      ? 0
      : fullPitch
      ? 0 // No need to offset for full pitch
      : axisX; // Offset only when rendering on half pitch for away team

    const cx = zoneX * i + zoneX / 2 - radius + offsetX;

    const wider = numPlayers === 1 ? 1 : verticalSpacingRatio;

    const spacing = (axisY - numPlayers * diameter) / (numPlayers + 1);

    for (let j = 0; j < numPlayers; j++) {
      const cy = spacing * (j + 1) + diameter * j + radius;
      const playerPos =
        orientation === "horizontal" ? { cx, cy } : { cx: cy, cy: cx };
      players.push(playerPos);
    }
  }

  return (
    <>
      {players.map((p, index) => (
        <circle
          key={index}
          cx={p.cx}
          cy={p.cy}
          r={radius}
          fill={teamColor}
          stroke="white"
          strokeWidth={2}
        />
      ))}
    </>
  );
}
