import { useContext } from "react";
import { PitchContext } from "../../DrawPitch/DrawPitch";

export default function TeamFormation({
  color = "#FF4444",
  radius = 8,
  formation = "4-3-3",
  isHomeTeam = true,
}) {
  const { width, height, orientation } = useContext(PitchContext);
  console.log("Team Formation ", width, height, orientation);

  console.log("Team Formation ", color, radius, formation, isHomeTeam);
}
