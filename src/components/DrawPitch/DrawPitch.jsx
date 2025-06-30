import React from "react";
import { getScaledPitchDimensions } from "./utils/getScaledPitchDimensions";
import { getPitchDirection } from "./utils/getPitchDirection";

export default function DrawPitch({
  width = 800,
  height = 500,
  direction = "horizontal",
  grassColor = "#007A57",
  lineColor = "#fff",
  lineWidth = 2,
  goalPostWidth = 5,
  goalPostColor = "#000",
  showGoalPost = true,
  showGoalArea = true,
  showPenaltyArea = true,
  showPenaltySpot = true,
  showPenaltyArc = true,
  showCornerArc = true,
  showHalfWayLine = true,
  showCenterCircle = true,
  showCenterPoint = true,
  circleRadius = 4,
  children,
}) {
  const dimensions = getScaledPitchDimensions(width, height);
  const directions = getPitchDirection(dimensions);

  function polarToCartesian(cx, cy, r, angleInRadians) {
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle, flip = false) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    const sweepFlag = flip ? "0" : "1";

    return `M ${start.x} ${start.y}
          A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
  }

  const pitch = {
    goalPost: {
      type: "rect",
      dimension: dimensions.GOAL_POST,
      direction: directions.GOAL_POST,
    },
    goalArea: {
      type: "rect",
      dimension: dimensions.GOAL_AREA,
      direction: directions.GOAL_AREA,
    },
    penaltyArea: {
      type: "rect",
      dimension: dimensions.PENALTY_AREA,
      direction: directions.PENALTY_AREA,
    },
    penaltySpot: {
      type: "circle",
      dimension: dimensions.PENALTY_SPOT,
      direction: directions.PENALTY_SPOT,
    },
    cornerArc: {
      type: "path",
      dimension: dimensions.CORNER_ARC,
      direction: directions.CORNER_ARC,
    },
    halfWayLine: {
      type: "line",
      dimension: dimensions.HALFWAY_LINE,
      direction: directions.HALFWAY_LINE,
    },
    centerCircle: {
      type: "circle",
      dimension: dimensions.CENTER_CIRCLE,
      direction: directions.CENTER_CIRCLE,
    },
    centerPoint: {
      type: "circle",
      dimension: dimensions.CENTER_POINT,
      direction: directions.CENTER_POINT,
    },
  };

  console.log("pitch", pitch);

  return (
    <svg width={width} height={height} style={{ backgroundColor: grassColor }}>
      {/* Outline */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Goal Posts */}
      {showGoalPost && (
        <>
          <rect
            width={goalPostWidth}
            height={pitch.goalPost.dimension[1]}
            x={pitch.goalPost.direction.home[0]}
            y={pitch.goalPost.direction.home[1]}
            fill={goalPostColor}
            strokeWidth={lineWidth}
          />
          <rect
            width={goalPostWidth}
            height={pitch.goalPost.dimension[1]}
            x={width - goalPostWidth}
            y={pitch.goalPost.direction.away[1]}
            fill={goalPostColor}
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Goal Areas */}
      {showGoalArea && (
        <>
          <rect
            width={pitch.goalArea.dimension[0]}
            height={pitch.goalArea.dimension[1]}
            x={pitch.goalArea.direction.home[0]}
            y={pitch.goalArea.direction.home[1]}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            width={pitch.goalArea.dimension[0]}
            height={pitch.goalArea.dimension[1]}
            x={pitch.goalArea.direction.away[0]}
            y={pitch.goalArea.direction.away[1]}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Penalty Areas */}
      {showPenaltyArea && (
        <>
          <rect
            width={pitch.penaltyArea.dimension[0]}
            height={pitch.penaltyArea.dimension[1]}
            x={pitch.penaltyArea.direction.home[0]}
            y={pitch.penaltyArea.direction.home[1]}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            width={pitch.penaltyArea.dimension[0]}
            height={pitch.penaltyArea.dimension[1]}
            x={pitch.penaltyArea.direction.away[0]}
            y={pitch.penaltyArea.direction.away[1]}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Penalty Spots */}
      {showPenaltySpot && (
        <>
          <circle
            cx={pitch.penaltySpot.direction.home[0]}
            cy={pitch.penaltySpot.direction.home[1]}
            r={circleRadius}
            fill={lineColor}
          />
          <circle
            cx={pitch.penaltySpot.direction.away[0]}
            cy={pitch.penaltySpot.direction.away[1]}
            r={circleRadius}
            fill={lineColor}
          />
        </>
      )}

      {/* Corner Arcs */}
      {showCornerArc &&
        pitch.cornerArc.direction.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        ))}

      {/* Halfway Line */}
      {showHalfWayLine && (
        <line
          x1={pitch.halfWayLine.direction.x1}
          y1={pitch.halfWayLine.direction.y1}
          x2={pitch.halfWayLine.direction.x2}
          y2={pitch.halfWayLine.direction.y2}
          stroke={lineColor}
          strokeWidth={lineWidth}
        />
      )}

      {/* Center Circle */}
      {showCenterCircle && (
        <circle
          cx={pitch.centerCircle.direction[0]}
          cy={pitch.centerCircle.direction[1]}
          r={pitch.centerCircle.dimension}
          stroke={lineColor}
          fill="none"
          strokeWidth={lineWidth}
        />
      )}

      {showCenterPoint && (
        <circle
          cx={pitch.centerPoint.direction[0]}
          cy={pitch.centerPoint.direction[1]}
          r={circleRadius}
          fill={lineColor}
        />
      )}

      {/* Children (layers) */}
      {children}
    </svg>
  );
}

// const cx = pitch.penaltyArc.dimension + 7.35;
// const cy = 250;
// const r = pitch.penaltyArc.dimension;

// // Convert degrees to radians
// const startAngle = (225 * Math.PI) / 180;
// const endAngle = (315 * Math.PI) / 180;

// // Start point (x0, y0)
// const x0 = cx + r * Math.cos(startAngle);
// const y0 = cy + r * Math.sin(startAngle);

// // End point (x1, y1)
// const x1 = cx + r * Math.cos(endAngle);
// const y1 = cy + r * Math.sin(endAngle);

// <path
//   d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`}
//   stroke={lineColor}
//   fill="none"
//   strokeWidth={lineWidth}
// />
