export function calculateFormationPositions({
    formation,
    isHomeTeam = true,
    width = 800,
    height = 500,
    formationWidthRatio = 1,
  }) {
    const rawPositions = formation.split('-').map(Number);
    rawPositions.unshift(1); // Add GK
  
    const semiWidth = width / 2;
    const usableWidth = semiWidth * formationWidthRatio;
    const offsetX = (semiWidth - usableWidth) / 2;
  
    const startX = isHomeTeam ? 0 : width;
    const direction = isHomeTeam ? 1 : -1;
  
    const playerWidth = 20;
    const playerHeight = 20;
  
    const numAreas = rawPositions.length;
    const areaWidth = usableWidth / numAreas;
  
    const playerPositions = [];
  
    let playerIndex = 0;
  
    for (let i = 0; i < numAreas; i++) {
      const numPlayers = rawPositions[i];
      const spaceBetween = (height - numPlayers * playerHeight) / (numPlayers + 1);
      const x =
        startX + direction * (offsetX + i * areaWidth + areaWidth / 2) - playerWidth / 2;
  
      for (let j = 0; j < numPlayers; j++) {
        const y = (j * (playerHeight + spaceBetween)) + spaceBetween;
        playerPositions.push({
          x,
          y,
          isGK: playerIndex === 0,
        });
        playerIndex++;
      }
    }
  
    return playerPositions;
  }
  