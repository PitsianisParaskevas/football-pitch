import { applyDirection } from "../../../FootballPitch/utils/calculateFootballPitch";

export function calculateFormationPositions({
  formation,
  isHomeTeam = true,
  width = 800,
  height = 500,
  direction = "horizontal",
  formationWidthRatio = 1,
}) {
  const formationParts = formation.split("-").map(Number);
  formationParts.unshift(1); // add goalkeeper

  // Directional logic
  const pitchLength = direction === "horizontal" ? width : height;
  const pitchWidth = direction === "horizontal" ? height : width;

  const semiLength = pitchLength / 2;
  const usableLength = semiLength * formationWidthRatio;
  const offsetX = (semiLength - usableLength) / 2;
  const startX = isHomeTeam ? 0 : semiLength;

  const playerWidth = 20;
  const playerHeight = 20;
  const areaWidth = usableLength / formationParts.length;

  // 🧠 Flip order if away team
  const zones = isHomeTeam ? formationParts : [...formationParts].reverse();

  const playerPositions = [];

  zones.forEach((numPlayers, i) => {
    const rawX =
      startX + offsetX + (i * areaWidth + areaWidth / 2) - playerWidth / 2;
    const spaceBetween =
      (pitchWidth - numPlayers * playerHeight) / (numPlayers + 1);

    for (let j = 0; j < numPlayers; j++) {
      const rawY = j * (playerHeight + spaceBetween) + spaceBetween;
      const p = applyDirection(rawX, rawY, direction, pitchLength, pitchWidth);
      playerPositions.push({
        x: p.x + playerWidth / 2,
        y: p.y + playerHeight / 2,
        isGK: i === 0 && j === 0,
      });
    }
  });

  return playerPositions;
}
