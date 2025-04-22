import { applyDirection } from '../../../FootballPitch/utils/calculateFootballPitch';

export function calculateFormationPositions({
  formation,
  isHomeTeam = true,
  width = 800,
  height = 500,
  direction = "horizontal",
  formationWidthRatio = 1
}) {
  const positions = formation.split('-').map(Number);
  positions.unshift(1); // Add GK

  if (!isHomeTeam) positions.reverse();

  const pitchLength = direction === "horizontal" ? width : height;
  const pitchWidth = direction === "horizontal" ? height : width;

  const semiLength = pitchLength / 2;
  const usableLength = semiLength * formationWidthRatio;
  const offsetX = (semiLength - usableLength) / 2;
  const startX = isHomeTeam ? 0 : pitchLength / 2;

  const playerWidth = 20;
  const playerHeight = 20;

  const numAreas = positions.length;
  const areaWidth = usableLength / numAreas;

  const playerPositions = [];

  for (let i = 0; i < numAreas; i++) {
    const numPlayers = positions[i];
    const spaceBetween = (pitchWidth - numPlayers * playerHeight) / (numPlayers + 1);
    const x = startX + offsetX + (i * areaWidth + areaWidth / 2) - playerWidth / 2;

    for (let j = 0; j < numPlayers; j++) {
      const y = (j * (playerHeight + spaceBetween)) + spaceBetween;
      const p = applyDirection(x, y, direction, pitchLength, pitchWidth);
      playerPositions.push({ x: p.x, y: p.y });
    }
  }

  return playerPositions;
}
