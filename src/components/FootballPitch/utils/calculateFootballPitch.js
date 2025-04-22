// calculateFootballPitch.js

export const applyDirection = (x, y, direction) => {
  return direction === 'vertical' ? { x: y, y: x } : { x, y };
};

export const getPitchDimensions = (width, height, direction) => {
  return direction === 'vertical'
    ? { pitchLength: height, pitchWidth: width }
    : { pitchLength: width, pitchWidth: height };
};

export const calculatePitchGeometry = (width, height, direction = 'horizontal') => {
  const { pitchLength, pitchWidth } = getPitchDimensions(width, height, direction);

  const center = {
    x: pitchLength / 2,
    y: pitchWidth / 2,
  };

  const dimensions = {
    penaltyBoxWidth: 120,
    penaltyBoxHeight: 300,
    goalBoxWidth: 40,
    goalBoxHeight: 160,
    centerCircleRadius: 60,
    cornerArcRadius: 12,
    goalDepth: 10,
    penaltySpotDistance: 80,
  };

  return { pitchLength, pitchWidth, center, ...dimensions };
};
