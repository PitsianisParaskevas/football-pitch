import React from "react";
import { getScaledPitchDimensions } from "./utils/getScaledPitchDimensions";
import { applyDirection } from "./utils/applyDirection";
import { getPitchDirection } from "./utils/getPitchDirection";

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
  const dimensions = getScaledPitchDimensions(width, height);
  const directions = getPitchDirection(dimensions);

  console.log("directions", directions);

  const pitch = {
    picht: {
      type: "rect",
      dimension: [dimensions.TOUCH_LINE, dimensions.GOAL_LINE],
    },
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
    penatlyArea: {
      type: "rect",
      dimension: dimensions.PENALTY_AREA,
      direction: directions.PENALTY_AREA,
    },
    penaltySpot: {
      type: "circle",
      dimension: dimensions.PENALTY_SPOT,
      direction: directions.PENALTY_SPOT,
    },
    penaltyArc: {
      type: "circle",
      dimension: dimensions.PENATLY_ARC,
      direction: "",
    },
    cornerArc: {
      type: "circle",
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

  console.log("pitch:", pitch);

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
      <rect
        width={pitch.goalArea.dimension[0]}
        height={pitch.goalArea.dimension[1]}
        x={pitch.goalArea.direction.home[0]}
        y={pitch.goalArea.direction.home[1]}
        // y={250 - pitch.goalArea.dimension[1] / 2 }
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      <circle
        cx={pitch.penaltySpot.direction.home[0]}
        cy={pitch.penaltySpot.direction.home[1]}
        r={4}
        stroke={lineColor}
        fill={lineColor}
        strokeWidth={lineWidth}
      />

      <rect
        width={pitch.penatlyArea.dimension[0]}
        height={pitch.penatlyArea.dimension[1]}
        x={pitch.penatlyArea.direction.home[0]}
        y={pitch.penatlyArea.direction.home[1]}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Away */}
      <rect
        width={pitch.goalPost.dimension[0]}
        height={pitch.goalPost.dimension[1]}
        x={pitch.goalPost.direction.away[0]}
        y={pitch.goalPost.direction.away[1]}
        stroke="#000"
        fill="none"
        strokeWidth={lineWidth}
      />

      <circle
        cx={pitch.penaltySpot.direction.away[0]}
        cy={pitch.penaltySpot.direction.away[1]}
        r={4}
        fill={"#000"}
        strokeWidth={lineWidth}
      />

      <rect
        width={pitch.goalArea.dimension[0]}
        height={pitch.goalArea.dimension[1]}
        x={pitch.goalArea.direction.away[0]}
        y={pitch.goalArea.direction.away[1]}
        stroke="#000"
        fill="none"
        strokeWidth={lineWidth}
      />

      <rect
        width={pitch.penatlyArea.dimension[0]}
        height={pitch.penatlyArea.dimension[1]}
        x={pitch.penatlyArea.direction.away[0]}
        y={pitch.penatlyArea.direction.away[1]}
        stroke="#000"
        fill="none"
        strokeWidth={lineWidth}
      />

      <line
        x1={pitch.halfWayLine.direction.x1} // width / 2
        y1={pitch.halfWayLine.direction.y1} // 0
        x2={pitch.halfWayLine.direction.x2} // width / 2
        y2={pitch.halfWayLine.direction.y2} // height
        stroke="#fc0303"
        strokeWidth={lineWidth}
      />

      <circle
        cx={pitch.centerCircle.direction[0]}
        cy={pitch.centerCircle.direction[1]}
        r={pitch.centerCircle.dimension}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      <circle
        cx={pitch.centerPoint.direction[0]}
        cy={pitch.centerPoint.direction[1]}
        r={4}
        stroke={lineColor}
        fill={lineColor}
        strokeWidth={lineWidth}
      />

      {showCornerArcs &&
        pitch.cornerArc.direction.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
        ))}
    </svg>
  );
}
