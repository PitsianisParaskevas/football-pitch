import React from "react";
import { getScaledPitchDimensions } from "./utils/getScaledPitchDimensions";
import { applyDirection } from "./utils/applyDirection";

export default function DrawPitch({
  width = 800,
  height = 500,
  direction = "horizontal",
  grassColor = "#4CAF50",
  lineColor = "#fff",
  lineWidth = 2,
  showCenterLine = true,
  showCenterCircle = true,
  showCornerArcs = true,
  showPenaltySpots = true,
  showPenaltyArea = true,
  showGoalArea = true,
  showGoalposts = true,
  children,
}) {
  const centerPos = applyDirection(center.x, center.y, direction);

  const dimensions = getScaledPitchDimensions(width, height);
  console.log("Scaled Pitch Dimensions:", dimensions);

  const {
    pitchLength,
    pitchWidth,
    center,
    penaltyArea,
    goalArea,
    goal,
    goal: { depth: goalDepth },
    centerCircleRadius,
    penaltySpotDistance,
    cornerArcRadius,
  } = dimensions;

  const drawRect = (x, y, w, h) => {
    const topLeft = applyDirection(x, y, direction);
    const bottomRight = applyDirection(x + w, y + h, direction);

    return {
      x: Math.min(topLeft.x, bottomRight.x),
      y: Math.min(topLeft.y, bottomRight.y),
      width: Math.abs(bottomRight.x - topLeft.x),
      height: Math.abs(bottomRight.y - topLeft.y),
    };
  };

  const drawCircle = (x, y, r) => {
    const p = applyDirection(x, y, direction);
    return <circle cx={p.x} cy={p.y} r={r} fill={lineColor} />;
  };

  const drawArcPath = (start, end, sweepFlag = 1) => {
    const s = applyDirection(...start, direction, pitchLength, pitchWidth);
    const e = applyDirection(...end, direction, pitchLength, pitchWidth);
    return `M${s.x},${s.y} A${cornerArcRadius},${cornerArcRadius} 0 0 ${sweepFlag} ${e.x},${e.y}`;
  };

  return (
    <svg width={width} height={height} style={{ backgroundColor: grassColor }}>
      {/* Pitch Outline */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Center Line */}
      {showCenterLine &&
        (() => {
          const p1 = applyDirection(pitchLength / 2, 0, direction);
          const p2 = applyDirection(pitchLength / 2, pitchWidth, direction);
          return (
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
          );
        })()}

      {/* Center Circle */}
      {showCenterCircle && (
        <>
          <circle
            cx={applyDirection(center.x, center.y, direction).x}
            cy={applyDirection(center.x, center.y, direction).y}
            r={centerCircleRadius}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          {drawCircle(center.x, center.y, 2)}
        </>
      )}

      {/* Penalty Areas */}
      {showPenaltyArea && (
        <>
          <rect
            {...drawRect(
              0,
              (pitchWidth - penaltyArea.height) / 2,
              penaltyArea.width,
              penaltyArea.height
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            {...drawRect(
              pitchLength - penaltyArea.width,
              (pitchWidth - penaltyArea.height) / 2,
              penaltyArea.width,
              penaltyArea.height
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Goal Areas */}
      {showGoalArea && (
        <>
          <rect
            {...drawRect(
              0,
              (pitchWidth - goalArea.height) / 2,
              goalArea.width,
              goalArea.height
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            {...drawRect(
              pitchLength - goalArea.width,
              (pitchWidth - goalArea.height) / 2,
              goalArea.width,
              goalArea.height
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Goalposts */}
      {showGoalposts && (
        <>
          <rect
            {...drawRect(
              -goalDepth,
              (pitchWidth - goal.width) / 2,
              goalDepth,
              goal.width
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            {...drawRect(
              pitchLength,
              (pitchWidth - goal.width) / 2,
              goalDepth,
              goal.width
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Penalty Spots */}
      {showPenaltySpots && (
        <>
          {drawCircle(penaltySpotDistance, center.y, 2)}
          {drawCircle(pitchLength - penaltySpotDistance, center.y, 2)}
        </>
      )}

      {/* Corner Arcs */}
      {showCornerArcs && (
        <>
          <path
            d={drawArcPath([0, cornerArcRadius], [cornerArcRadius, 0], 0)}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <path
            d={drawArcPath(
              [pitchLength - cornerArcRadius, 0],
              [pitchLength, cornerArcRadius],
              0
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <path
            d={drawArcPath(
              [0, pitchWidth - cornerArcRadius],
              [cornerArcRadius, pitchWidth],
              1
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <path
            d={drawArcPath(
              [pitchLength - cornerArcRadius, pitchWidth],
              [pitchLength, pitchWidth - cornerArcRadius],
              1
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Custom layers/children */}
      {children}
    </svg>
  );
}
