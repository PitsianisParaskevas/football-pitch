import React from 'react';
import { calculateFormationPositions } from './utils/calculateFormationPositions';

const FormationLayer = ({
  formation,
  isHomeTeam,
  teamColor,
  goalkeeperColor,
  width = 800,
  height = 500,
  formationWidthRatio = 1,
}) => {
  const players = calculateFormationPositions({
    formation,
    isHomeTeam,
    width,
    height,
    formationWidthRatio,
  });

  const defaultTeamColor = isHomeTeam ? 'blue' : 'red';
  const defaultGKColor = isHomeTeam ? 'darkblue' : 'darkred';

  const fieldColor = teamColor || defaultTeamColor;
  const gkColor = goalkeeperColor || defaultGKColor;

  return (
    <>
      {players.map((pos, index) => (
        <circle
          key={index}
          cx={pos.x}
          cy={pos.y}
          r={10}
          fill={pos.isGK ? gkColor : fieldColor}
          stroke="white"
          strokeWidth={2}
        />
      ))}
    </>
  );
};

export default FormationLayer;
