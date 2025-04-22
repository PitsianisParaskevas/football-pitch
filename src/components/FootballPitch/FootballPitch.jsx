import React from "react";
import {
  applyDirection,
  calculatePitchGeometry,
} from "./utils/calculateFootballPitch";

const FootballPitch = ({
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
}) => {
  const {
    pitchLength,
    pitchWidth,
    center,
    penaltyBoxWidth,
    penaltyBoxHeight,
    goalBoxWidth,
    goalBoxHeight,
    centerCircleRadius,
    cornerArcRadius,
    goalDepth,
    penaltySpotDistance,
  } = calculatePitchGeometry(width, height, direction);

  const drawRect = (x, y, w, h) => {
    const p = applyDirection(x, y, direction);
    return {
      x: p.x,
      y: p.y,
      width: direction === "vertical" ? h : w,
      height: direction === "vertical" ? w : h,
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
          {drawCircle(center.x, center.y, 3)}
        </>
      )}

      {/* Penalty Areas */}
      {showPenaltyArea && (
        <>
          <rect
            {...drawRect(
              0,
              (pitchWidth - penaltyBoxHeight) / 2,
              penaltyBoxWidth,
              penaltyBoxHeight
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            {...drawRect(
              pitchLength - penaltyBoxWidth,
              (pitchWidth - penaltyBoxHeight) / 2,
              penaltyBoxWidth,
              penaltyBoxHeight
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
              (pitchWidth - goalBoxHeight) / 2,
              goalBoxWidth,
              goalBoxHeight
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            {...drawRect(
              pitchLength - goalBoxWidth,
              (pitchWidth - goalBoxHeight) / 2,
              goalBoxWidth,
              goalBoxHeight
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
            {...drawRect(-goalDepth, (pitchWidth - 60) / 2, goalDepth, 60)}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            {...drawRect(pitchLength, (pitchWidth - 60) / 2, goalDepth, 60)}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Penalty Spots */}
      {showPenaltySpots && (
        <>
          {drawCircle(penaltySpotDistance, center.y, 3)}
          {drawCircle(pitchLength - penaltySpotDistance, center.y, 3)}
        </>
      )}

      {/* Corner Arcs */}
      {showCornerArcs && (
        <>
          {/* Top-left corner */}
          <path
            d={drawArcPath(
              [0, cornerArcRadius],
              [cornerArcRadius, 0],
              direction === "horizontal" ? 0 : 1
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />

          {/* Top-right corner */}
          <path
            d={drawArcPath(
              [pitchLength - cornerArcRadius, 0],
              [pitchLength, cornerArcRadius],
              direction === "horizontal" ? 0 : 1
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />

          {/* Bottom-left corner */}
          <path
            d={drawArcPath(
              [0, pitchWidth - cornerArcRadius],
              [cornerArcRadius, pitchWidth],
              direction === "horizontal" ? 1 : 0
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />

          {/* Bottom-right corner */}
          <path
            d={drawArcPath(
              [pitchLength - cornerArcRadius, pitchWidth],
              [pitchLength, pitchWidth - cornerArcRadius],
              direction === "horizontal" ? 1 : 0
            )}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Extra layers (Formation, Shots, etc.) */}
      {children}
    </svg>
  );
};

export default FootballPitch;
