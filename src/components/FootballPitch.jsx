import React from 'react';

const FootballPitch = ({
  width = 800,
  height = 500,
  grassColor = '#4CAF50',
  lineColor = '#fff',
  lineWidth = 2,
  showCenterCircle = true,
  showCornerArcs = true,
  showPenaltySpots = true,
  children,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const penaltyBoxWidth = 120;
  const penaltyBoxHeight = 300;
  const goalBoxWidth = 40;
  const goalBoxHeight = 160;
  const centerCircleRadius = 60;
  const cornerArcRadius = 12;
  const goalDepth = 10;
  const penaltySpotDistance = 80;

  return (
    <svg width={width} height={height} style={{ backgroundColor: grassColor }}>
      {/* Full pitch outline */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Center line */}
      <line
        x1={centerX}
        y1={0}
        x2={centerX}
        y2={height}
        stroke={lineColor}
        strokeWidth={lineWidth}
      />

      {/* Center circle */}
      {showCenterCircle && (
        <>
          <circle
            cx={centerX}
            cy={centerY}
            r={centerCircleRadius}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <circle cx={centerX} cy={centerY} r={3} fill={lineColor} />
        </>
      )}

      {/* Left penalty area */}
      <rect
        x={0}
        y={(height - penaltyBoxHeight) / 2}
        width={penaltyBoxWidth}
        height={penaltyBoxHeight}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Right penalty area */}
      <rect
        x={width - penaltyBoxWidth}
        y={(height - penaltyBoxHeight) / 2}
        width={penaltyBoxWidth}
        height={penaltyBoxHeight}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Left goal box */}
      <rect
        x={0}
        y={(height - goalBoxHeight) / 2}
        width={goalBoxWidth}
        height={goalBoxHeight}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Right goal box */}
      <rect
        x={width - goalBoxWidth}
        y={(height - goalBoxHeight) / 2}
        width={goalBoxWidth}
        height={goalBoxHeight}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Goalposts */}
      <rect
        x={-goalDepth}
        y={(height - 60) / 2}
        width={goalDepth}
        height={60}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      <rect
        x={width}
        y={(height - 60) / 2}
        width={goalDepth}
        height={60}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Penalty spots */}
      {showPenaltySpots && (
        <>
          <circle cx={penaltySpotDistance} cy={centerY} r={3} fill={lineColor} />
          <circle cx={width - penaltySpotDistance} cy={centerY} r={3} fill={lineColor} />
        </>
      )}

      {/* Corner arcs */}
      {showCornerArcs && (
        <>
          <path
            d={`M0,${cornerArcRadius} A${cornerArcRadius},${cornerArcRadius} 0 0 1 ${cornerArcRadius},0`}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <path
            d={`M${width - cornerArcRadius},0 A${cornerArcRadius},${cornerArcRadius} 0 0 1 ${width},${cornerArcRadius}`}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <path
            d={`M0,${height - cornerArcRadius} A${cornerArcRadius},${cornerArcRadius} 0 0 0 ${cornerArcRadius},${height}`}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <path
            d={`M${width - cornerArcRadius},${height} A${cornerArcRadius},${cornerArcRadius} 0 0 0 ${width},${height - cornerArcRadius}`}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Extra layers like formation, shots, heatmap */}
      {children}
    </svg>
  );
};

export default FootballPitch;
