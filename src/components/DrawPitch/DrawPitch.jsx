import React, { createContext } from "react";

// Create the context
export const PitchContext = createContext(null);

const standardPitch = {
  TOUCH_LINE: 105,
  GOAL_LINE: 68,
  GOAL_POST: [1, 8],
  GOAL_AREA: [6, 20],
  PENALTY_AREA: [18, 44],
  PENALTY_SPOT_RADIUS: 0.5,
  PENALTY_SPOT: 12,
  PENALTY_ARC: 6,
  CORNER_ARC: 1,
  CENTER_CIRCLE: 10,
};

export default function DrawPitch({
  width = "800",
  height = "500",
  orientation = "horizontal",
  grassColor = "#007A57",
  lineColor = "#fff",
  lineWidth = 1,
  goalPostColor = "#fff",
  cornerR = 1,
  children,
}) {
  const scaleWidth = width / standardPitch.TOUCH_LINE;
  const scaleHeight = height / standardPitch.GOAL_LINE;

  const scalePitch = {
    TOUCH_LINE: scaleWidth * standardPitch.TOUCH_LINE,
    GOAL_LINE: scaleHeight * standardPitch.GOAL_LINE,
    GOAL_POST: [
      scaleWidth * standardPitch.GOAL_POST[0],
      scaleHeight * standardPitch.GOAL_POST[1],
    ],
    GOAL_AREA: [
      scaleWidth * standardPitch.GOAL_AREA[0],
      scaleHeight * standardPitch.GOAL_AREA[1],
    ],
    PENALTY_AREA: [
      scaleWidth * standardPitch.PENALTY_AREA[0],
      scaleHeight * standardPitch.PENALTY_AREA[1],
    ],
    PENALTY_SPOT_RADIUS: scaleWidth * standardPitch.PENALTY_SPOT_RADIUS,
    PENALTY_SPOT: scaleWidth * standardPitch.PENALTY_SPOT,
    PENALTY_ARC: scaleWidth * standardPitch.PENALTY_ARC,
    CENTER_CIRCLE: scaleWidth * standardPitch.CENTER_CIRCLE,
    CORNER_ARC: scaleWidth * standardPitch.CORNER_ARC,
  };

  console.log("scalePitch", scalePitch);

  const orientWidth =
    orientation === "horizontal" ? scalePitch.TOUCH_LINE : scalePitch.GOAL_LINE;
  const orientHeight =
    orientation === "horizontal" ? scalePitch.GOAL_LINE : scalePitch.TOUCH_LINE;

  const axisX = orientWidth;
  const axisY = orientHeight;
  const midX = axisX / 2;
  const midY = axisY / 2;

  const footpitchHorizontal = {
    pitch: {
      type: "rect",
      size: [width, height],
      position: [0, 0],
    },
    goalPostHome: {
      type: "rect",
      size: [scalePitch.GOAL_POST[0], scalePitch.GOAL_POST[1]],
      position: [0, midY - scalePitch.GOAL_POST[1] / 2],
    },
    goalAreaHome: {
      type: "rect",
      size: [scalePitch.GOAL_AREA[0], scalePitch.GOAL_AREA[1]],
      position: [0, midY - scalePitch.GOAL_AREA[1] / 2],
    },
    penaltySpotHome: {
      type: "circle",
      size: scalePitch.PENALTY_SPOT_RADIUS,
      position: [scalePitch.PENALTY_SPOT, midY],
    },
    penaltyAreaHome: {
      type: "rect",
      size: [scalePitch.PENALTY_AREA[0], scalePitch.PENALTY_AREA[1]],
      position: [0, midY - scalePitch.PENALTY_AREA[1] / 2],
    },
    penaltyArcHome: {
      type: "path",
      size: cornerR,
      position: `
      M  
      ${scalePitch.PENALTY_AREA[0]} 
      ${midY - scalePitch.PENALTY_ARC}
         A
        ${(scalePitch.PENALTY_ARC / Math.PI) * 2} ${scalePitch.PENALTY_ARC}
         0 1 1 
        ${scalePitch.PENALTY_AREA[0]} ${midY + scalePitch.PENALTY_ARC}
        `,
    },
    // Away
    goalPostAway: {
      type: "rect",
      size: [scalePitch.GOAL_POST[0], scalePitch.GOAL_POST[1]],
      position: [
        axisX - scalePitch.GOAL_POST[0],
        midY - scalePitch.GOAL_POST[1] / 2,
      ],
    },
    goalAreaAway: {
      type: "rect",
      size: [scalePitch.GOAL_AREA[0], scalePitch.GOAL_AREA[1]],
      position: [
        axisX - scalePitch.GOAL_AREA[0],
        midY - scalePitch.GOAL_AREA[1] / 2,
      ],
    },
    penaltySpotAway: {
      type: "circle",
      size: scalePitch.PENALTY_SPOT_RADIUS,
      position: [axisX - scalePitch.PENALTY_SPOT, midY],
    },
    penaltyAreaAway: {
      type: "rect",
      size: [scalePitch.PENALTY_AREA[0], scalePitch.PENALTY_AREA[1]],
      position: [
        axisX - scalePitch.PENALTY_AREA[0],
        midY - scalePitch.PENALTY_AREA[1] / 2,
      ],
    },
    penaltyArcAway: {
      type: "path",
      size: cornerR,
      position: `        
        M  
         ${axisX - scalePitch.PENALTY_AREA[0]} 
         ${midY - scalePitch.PENALTY_ARC}
        A
         ${(scalePitch.PENALTY_ARC / Math.PI) * 2} 
         ${scalePitch.PENALTY_ARC}
         0 1 0 
         ${axisX - scalePitch.PENALTY_AREA[0]} 
         ${midY + scalePitch.PENALTY_ARC}        
        `,
    },
    // Center
    halfwayLine: {
      type: "line",
      size: lineWidth,
      position: [midX, 0, midX, axisY],
    },
    centerPoint: {
      type: "circle",
      size: scalePitch.PENALTY_SPOT_RADIUS,
      position: [midX, midY],
    },
    centerCircle: {
      type: "circle",
      size: scalePitch.CENTER_CIRCLE,
      position: [midX, midY],
    },
    // Corner
    cornerArc: {
      type: "path",
      size: cornerR,
      position: [
        // top-left
        `M 0 ${scalePitch.CORNER_ARC} 
         A ${scalePitch.CORNER_ARC} ${scalePitch.CORNER_ARC} 
         0 0 0 
         ${scalePitch.CORNER_ARC} 0
        `,
        // bottom-left
        `M 0 ${axisY - scalePitch.CORNER_ARC} 
         A ${scalePitch.CORNER_ARC} ${scalePitch.CORNER_ARC} 
         0 0 1 
         ${scalePitch.CORNER_ARC} ${axisY}
        `,
        // top-right
        `M ${axisX - scalePitch.CORNER_ARC} 0 
         A ${scalePitch.CORNER_ARC} ${scalePitch.CORNER_ARC} 
         0 0 0 
         ${axisX} ${scalePitch.CORNER_ARC}
        `,
        // bottom-right
        `M ${axisX - scalePitch.CORNER_ARC} ${axisY} 
         A ${scalePitch.CORNER_ARC} ${scalePitch.CORNER_ARC} 
         0 0 1 
         ${axisX} ${axisY - scalePitch.CORNER_ARC}
        `,
      ],
    },
  };

  const footpitchVertical = {
    pitch: {
      type: "rect",
      size: [width, height],
      position: [0, 0],
    },
    // Home
    goalPostHome: {
      type: "rect",
      size: [scalePitch.GOAL_POST[1], scalePitch.GOAL_POST[0]],
      position: [midX - scalePitch.GOAL_POST[1] / 2, 0],
    },
    goalAreaHome: {
      type: "rect",
      size: [scalePitch.GOAL_AREA[1], scalePitch.GOAL_AREA[0]],
      position: [midX - scalePitch.GOAL_AREA[1] / 2, 0],
    },
    penaltySpotHome: {
      type: "circle",
      size: scalePitch.PENALTY_SPOT_RADIUS,
      position: [midX, scalePitch.PENALTY_SPOT],
    },
    penaltyAreaHome: {
      type: "rect",
      size: [scalePitch.PENALTY_AREA[1], scalePitch.PENALTY_AREA[0]],
      position: [midX - scalePitch.PENALTY_AREA[1] / 2, 0],
    },
    penaltyArcHome: {
      type: "path",
      size: cornerR,
      position: `
        M ${midX + scalePitch.PENALTY_ARC} ${scalePitch.PENALTY_AREA[0]}
        A ${scalePitch.PENALTY_ARC} ${(scalePitch.PENALTY_ARC / Math.PI) * 2}
         0 0 1 
         ${midX - scalePitch.PENALTY_ARC} ${scalePitch.PENALTY_AREA[0]}
        `,
    },
    // Away
    goalPostAway: {
      type: "rect",
      size: [scalePitch.GOAL_POST[1], scalePitch.GOAL_POST[0]],
      position: [
        midX - scalePitch.GOAL_POST[1] / 2,
        axisY - scalePitch.GOAL_POST[0],
      ],
    },
    goalAreaAway: {
      type: "rect",
      size: [scalePitch.GOAL_AREA[1], scalePitch.GOAL_AREA[0]],
      position: [
        midX - scalePitch.GOAL_AREA[1] / 2,
        axisY - scalePitch.GOAL_AREA[0],
      ],
    },
    penaltySpotAway: {
      type: "circle",
      size: scalePitch.PENALTY_SPOT_RADIUS,
      position: [midX, axisY - scalePitch.PENALTY_SPOT],
    },
    penaltyAreaAway: {
      type: "rect",
      size: [scalePitch.PENALTY_AREA[1], scalePitch.PENALTY_AREA[0]],
      position: [
        midX - scalePitch.PENALTY_AREA[1] / 2,
        axisY - scalePitch.PENALTY_AREA[0],
      ],
    },
    penaltyArcAway: {
      type: "path",
      size: cornerR,
      position: `
        M 
         ${midX + scalePitch.PENALTY_ARC} 
         ${axisY - scalePitch.PENALTY_AREA[0]}
        A 
         ${scalePitch.PENALTY_ARC} 
         ${(scalePitch.PENALTY_ARC / Math.PI) * 2}
         0 0 0 
         ${midX - scalePitch.PENALTY_ARC} 
         ${axisY - scalePitch.PENALTY_AREA[0]}
        `,
    },
    // Center
    halfwayLine: {
      type: "line",
      size: lineWidth,
      position: [0, midY, axisY, midY],
    },
    centerPoint: {
      type: "circle",
      size: scalePitch.PENALTY_SPOT_RADIUS,
      position: [midX, midY],
    },
    centerCircle: {
      type: "circle",
      size: scalePitch.CENTER_CIRCLE,
      position: [midX, midY],
    },
    // Corner
    cornerArc: {
      type: "path",
      size: cornerR,
      position: [
        // top-left
        `M 0 ${scalePitch.CORNER_ARC} 
         A ${scalePitch.CORNER_ARC} ${scalePitch.CORNER_ARC} 
         0 0 0 
         ${scalePitch.CORNER_ARC} 0
        `,
        // bottom-left
        `M 0 ${axisY - scalePitch.CORNER_ARC} 
         A ${scalePitch.CORNER_ARC} ${scalePitch.CORNER_ARC} 
         0 0 1 
         ${scalePitch.CORNER_ARC} ${axisY}
        `,
        // top-right
        `M ${axisX - scalePitch.CORNER_ARC} 0 
         A ${scalePitch.CORNER_ARC} ${scalePitch.CORNER_ARC} 
         0 0 0 
         ${axisX} ${scalePitch.CORNER_ARC}
        `,
        // bottom-right
        `M ${axisX - scalePitch.CORNER_ARC} ${axisY} 
         A ${scalePitch.CORNER_ARC} ${scalePitch.CORNER_ARC} 
         0 0 1 
         ${axisX} ${axisY - scalePitch.CORNER_ARC}
        `,
      ],
    },
  };

  const footpitch =
    orientation === "horizontal" ? footpitchHorizontal : footpitchVertical;

  return (
    <PitchContext.Provider
      value={{
        width,
        height,
        orientation,
        axisX,
        axisY,
        scalePitch,
      }}
    >
      <svg width={axisX} height={axisY} style={{ backgroundColor: grassColor }}>
        {/* Outline */}
        <rect
          width={footpitch.pitch.size[0]}
          height={footpitch.pitch.size[1]}
          x={footpitch.pitch.size[0]}
          y={footpitch.pitch.size[1]}
          stroke={lineColor}
          fill="none"
          strokeWidth={lineWidth}
        />

        {/* Areas */}
        {/* Home */}
        <rect
          width={footpitch.goalPostHome.size[0]}
          height={footpitch.goalPostHome.size[1]}
          x={footpitch.goalPostHome.position[0]}
          y={footpitch.goalPostHome.position[1]}
          strokeWidth={lineWidth}
          fill={goalPostColor}
        />
        <rect
          width={footpitch.goalAreaHome.size[0]}
          height={footpitch.goalAreaHome.size[1]}
          x={footpitch.goalAreaHome.position[0]}
          y={footpitch.goalAreaHome.position[1]}
          stroke={lineColor}
          fill="none"
          strokeWidth={lineWidth}
        />

        <rect
          width={footpitch.penaltyAreaHome.size[0]}
          height={footpitch.penaltyAreaHome.size[1]}
          x={footpitch.penaltyAreaHome.position[0]}
          y={footpitch.penaltyAreaHome.position[1]}
          stroke={lineColor}
          fill="none"
          strokeWidth={lineWidth}
        />

        <circle
          cx={footpitch.penaltySpotHome.position[0]}
          cy={footpitch.penaltySpotHome.position[1]}
          r={footpitch.penaltySpotHome.size}
          fill={lineColor}
        />

        <path
          d={footpitch.penaltyArcHome.position}
          stroke={lineColor}
          fill="none"
          strokeWidth={footpitch.penaltyArcHome.size}
        />

        {/* Away */}
        <rect
          width={footpitch.goalPostAway.size[0]}
          height={footpitch.goalPostAway.size[1]}
          x={footpitch.goalPostAway.position[0]}
          y={footpitch.goalPostAway.position[1]}
          fill={goalPostColor}
          strokeWidth={lineWidth}
        />
        <rect
          width={footpitch.goalAreaAway.size[0]}
          height={footpitch.goalAreaAway.size[1]}
          x={footpitch.goalAreaAway.position[0]}
          y={footpitch.goalAreaAway.position[1]}
          stroke={lineColor}
          fill="none"
          strokeWidth={lineWidth}
        />

        <rect
          width={footpitch.penaltyAreaAway.size[0]}
          height={footpitch.penaltyAreaAway.size[1]}
          x={footpitch.penaltyAreaAway.position[0]}
          y={footpitch.penaltyAreaAway.position[1]}
          stroke={lineColor}
          fill="none"
          strokeWidth={lineWidth}
        />

        <circle
          cx={footpitch.penaltySpotAway.position[0]}
          cy={footpitch.penaltySpotAway.position[1]}
          r={footpitch.penaltySpotAway.size}
          fill={lineColor}
        />

        <path
          d={footpitch.penaltyArcAway.position}
          stroke={lineColor}
          fill="none"
          strokeWidth={footpitch.penaltyArcAway.size}
        />

        {/* Half */}

        <line
          x1={footpitch.halfwayLine.position[0]}
          y1={footpitch.halfwayLine.position[1]}
          x2={footpitch.halfwayLine.position[2]}
          y2={footpitch.halfwayLine.position[3]}
          strokeWidth={footpitch.halfwayLine.size}
          stroke={lineColor}
        />

        <circle
          cx={footpitch.centerPoint.position[0]}
          cy={footpitch.centerPoint.position[1]}
          r={footpitch.centerPoint.size}
          fill={lineColor}
        />

        <circle
          cx={footpitch.centerCircle.position[0]}
          cy={footpitch.centerCircle.position[1]}
          r={footpitch.centerCircle.size}
          stroke={lineColor}
          fill="none"
        />

        {/* Corner */}

        {footpitch.cornerArc.position.map((pathData, i) => (
          <path
            key={`corner-${i}`}
            d={pathData}
            stroke={lineColor}
            fill="none"
            strokeWidth={footpitch.cornerArc.size}
          />
        ))}
        {children}
      </svg>
    </PitchContext.Provider>
  );
}
