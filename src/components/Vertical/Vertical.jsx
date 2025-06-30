import React from "react";
import { getScaledPitchDimensions } from "../DrawPitch/utils/getScaledPitchDimensions";
import { getPitchDirection } from "../DrawPitch/utils/getPitchDirection";

export default function Vertical({
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
  // Swap width and height if vertical
  const pitchWidth = direction === "vertical" ? height : width;
  const pitchHeight = direction === "vertical" ? width : height;

  const dimensions = getScaledPitchDimensions(width, height, direction);
  const directions = getPitchDirection(dimensions, direction);

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

  return (
    <svg
      width={pitchWidth}
      height={pitchHeight}
      style={{ backgroundColor: grassColor }}
    >
      {/* Outline */}
      <rect
        x={0}
        y={0}
        width={pitchWidth}
        height={pitchHeight}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />
      {/* Goal Posts */}
      {showGoalPost && (
        <>
          <rect
            width={pitch.goalPost.dimension[1]}
            height={goalPostWidth}
            x={pitch.goalPost.direction.home[1]}
            y={pitch.goalPost.direction.home[0]}
            fill={goalPostColor}
            strokeWidth={lineWidth}
          />
          <rect
            width={pitch.goalPost.dimension[1]}
            height={goalPostWidth}
            x={pitch.goalPost.direction.away[1]}
            y={width - goalPostWidth}
            fill={goalPostColor}
            strokeWidth={lineWidth}
          />
        </>
      )}

      <rect
        width={pitch.goalArea.dimension[1]}
        height={pitch.goalArea.dimension[0]}
        x={pitch.goalArea.direction.home[1]}
        y={pitch.goalArea.direction.home[0]}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      <rect
        width={pitch.goalArea.dimension[1]}
        height={pitch.goalArea.dimension[0]}
        x={pitch.goalArea.direction.away[1]}
        y={pitch.goalArea.direction.away[0]}
        stroke={"#000"}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Penalty Areas */}
      {showPenaltyArea && (
        <>
          <rect
            width={pitch.penaltyArea.dimension[1]}
            height={pitch.penaltyArea.dimension[0]}
            x={pitch.penaltyArea.direction.home[1]}
            y={pitch.penaltyArea.direction.home[0]}
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />
          <rect
            width={pitch.penaltyArea.dimension[1]}
            height={pitch.penaltyArea.dimension[0]}
            x={pitch.penaltyArea.direction.away[1]}
            y={pitch.penaltyArea.direction.away[0]}
            stroke={"#000"}
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {showPenaltySpot && (
        <>
          <circle
            cx={pitch.penaltySpot.direction.home[1]}
            cy={pitch.penaltySpot.direction.home[0]}
            r={circleRadius}
            fill={lineColor}
          />
          <circle
            cx={pitch.penaltySpot.direction.away[1]}
            cy={pitch.penaltySpot.direction.away[0]}
            r={circleRadius}
            fill={lineColor}
          />
        </>
      )}

      {/* Corner Arcs */}
      {showCornerArc && (
        <>
          <path
            key={0}
            d={
              "M 0 7.352941176470588 A 7.352941176470588 7.352941176470588 0 0 0 7.352941176470588 0"
            }
            stroke={lineColor}
            fill="none"
            strokeWidth={lineWidth}
          />

          <path
            key={1}
            d={
              "M 492.6470588235294 0 A 7.352941176470588 7.352941176470588 0 0 0 500 7.352941176470588"
            }
            stroke="blue"
            fill="none"
            strokeWidth={lineWidth}
          />

          <path
            key={2}
            d={
              "M 0 792.6470588235294 A 7.352941176470588 7.352941176470588 0 0 1 7.352941176470588 800"
            }
            stroke="red"
            fill="none"
            strokeWidth={lineWidth}
          />

          <path
            key={3}
            d={
              "M 492.6470588235294 800 A 7.352941176470588 7.352941176470588 0 0 1 500 792.6470588235294"
            }
            stroke="yellow"
            fill="none"
            strokeWidth={lineWidth}
          />
        </>
      )}

      {/* Halfway Line */}
      {showHalfWayLine && (
        <line
          x1={pitch.halfWayLine.direction.y1}
          y1={pitch.halfWayLine.direction.x1}
          x2={pitch.halfWayLine.direction.y2}
          y2={pitch.halfWayLine.direction.x2}
          stroke={lineColor}
          strokeWidth={lineWidth}
        />
      )}

      {/* Center Circle */}
      {showCenterCircle && (
        <circle
          cx={pitch.centerCircle.direction[1]}
          cy={pitch.centerCircle.direction[0]}
          r={pitch.centerCircle.dimension}
          stroke={lineColor}
          fill="none"
          strokeWidth={lineWidth}
        />
      )}

      {showCenterPoint && (
        <circle
          cx={pitch.centerPoint.direction[1]}
          cy={pitch.centerPoint.direction[0]}
          r={circleRadius}
          fill={lineColor}
        />
      )}

      {/* Children (layers) */}
      {children}
    </svg>
  );
}
