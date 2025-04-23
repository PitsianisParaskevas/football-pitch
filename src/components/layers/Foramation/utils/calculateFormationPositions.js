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
  formationParts.unshift(1); // Add GK at the beginning

  // Define pitch geometry based on direction
  const pitchLength = direction === "horizontal" ? width : height;
  const pitchWidth = direction === "horizontal" ? height : width;

  const semiLength = pitchLength / 2;
  const usableLength = semiLength * formationWidthRatio;
  const offset = (semiLength - usableLength) / 2;
  const startLine = isHomeTeam ? 0 : semiLength;

  const playerRadius = 10;
  const playerWidth = playerRadius * 2;
  const playerHeight = playerRadius * 2;

  const areaWidth = usableLength / formationParts.length;

  // Flip formation for away team (so we render from goal to attack)
  const zones = isHomeTeam ? formationParts : [...formationParts].reverse();

  const playerPositions = [];

  for (let i = 0; i < zones.length; i++) {
    const numPlayers = zones[i];

    // x = along pitchLength (horizontal: x, vertical: y)
    const logicalX =
      startLine + offset + (i * areaWidth + areaWidth / 2) - playerWidth / 2;

    // space players evenly along pitchWidth (horizontal: y, vertical: x)
    const spaceBetween =
      (pitchWidth - numPlayers * playerHeight) / (numPlayers + 1);

    for (let j = 0; j < numPlayers; j++) {
      const logicalY = j * (playerHeight + spaceBetween) + spaceBetween;

      // Center before applying direction
      const centeredX = logicalX + playerWidth / 2;
      const centeredY = logicalY + playerHeight / 2;

      const p = applyDirection(
        centeredX,
        centeredY,
        direction,
        pitchLength,
        pitchWidth
      );

      // GK detection: first player in home, last in away (because we reversed)
      const isGK = isHomeTeam
        ? i === 0 && j === 0
        : i === zones.length - 1 && j === 0;

      playerPositions.push({
        x: p.x,
        y: p.y,
        isGK,
      });
    }
  }

  return playerPositions;
}
