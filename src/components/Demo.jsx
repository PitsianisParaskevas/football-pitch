export default function Demo({
  orientation = "horizontal",
  grassColor = "#007A57",
  lineColor = "#fff",
  lineWidth = 1,
  goalPostWidth = 5,
  goalPostColor = "#000",
  circleRadius = 1,
  cornerR = 1,
  children,
}) {
  const standardPitch = {
    TOUCH_LINE: 105,
    GOAL_LINE: 68,
    GOAL_POST: [2, 8],
    GOAL_AREA: [6, 20],
    PENALTY_AREA: [18, 44],
    PENALTY_SPOT: 12,
    PENATLY_ARC: 10,
    // CORNER_ARC: 5.5,
    CENTER_CIRCLE: 10,
  };

  const width =
    orientation === "horizontal"
      ? standardPitch.TOUCH_LINE
      : standardPitch.GOAL_LINE;
  const height =
    orientation === "horizontal"
      ? standardPitch.GOAL_LINE
      : standardPitch.TOUCH_LINE;

  const axisX = width;
  const axisY = height;
  const midX = axisX / 2;
  const midY = axisY / 2;

  const footpitchHorizontal = {
    pitch: {
      type: "rect",
      size: [width, height],
      position: [0, 0],
    },
    goalAreaHome: {
      type: "rect",
      size: [standardPitch.GOAL_AREA[0], standardPitch.GOAL_AREA[1]],
      position: [0, midY - standardPitch.GOAL_AREA[1] / 2],
    },
    penatlySpotHome: {
      type: "circle",
      size: circleRadius,
      position: [standardPitch.PENALTY_SPOT, midY],
    },
    penaltyAreaHome: {
      type: "rect",
      size: [standardPitch.PENALTY_AREA[0], standardPitch.PENALTY_AREA[1]],
      position: [0, midY - standardPitch.PENALTY_AREA[1] / 2],
    },
    penaltyArcHome: {
      type: "path",
      size: cornerR,
      position: `M  ${standardPitch.PENALTY_AREA[0]} ${
        midY - standardPitch.PENATLY_ARC
      }
         A
        ${standardPitch.PENATLY_ARC} ${standardPitch.PENATLY_ARC}
         0 1 1 
        ${standardPitch.PENALTY_AREA[0]} ${midY + standardPitch.PENATLY_ARC}
        `,
    },
    // Away
    goalAreaAway: {
      type: "rect",
      size: [standardPitch.GOAL_AREA[0], standardPitch.GOAL_AREA[1]],
      position: [
        axisX - standardPitch.GOAL_AREA[0],
        midY - standardPitch.GOAL_AREA[1] / 2,
      ],
    },
    penatlySpotAway: {
      type: "circle",
      size: circleRadius,
      position: [axisX - standardPitch.PENALTY_SPOT, midY],
    },
    penaltyAreaAway: {
      type: "rect",
      size: [standardPitch.PENALTY_AREA[0], standardPitch.PENALTY_AREA[1]],
      position: [
        axisX - standardPitch.PENALTY_AREA[0],
        midY - standardPitch.PENALTY_AREA[1] / 2,
      ],
    },
    penaltyArcAway: {
      type: "path",
      size: cornerR,
      position: `        
        M  
         ${axisX - standardPitch.PENALTY_AREA[0]} 
         ${midY - standardPitch.PENATLY_ARC}
        A
         ${standardPitch.PENATLY_ARC} 
         ${standardPitch.PENATLY_ARC}
         0 1 0 
         ${axisX - standardPitch.PENALTY_AREA[0]} 
         ${midY + standardPitch.PENATLY_ARC}        
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
      size: circleRadius,
      position: [midX, midY],
    },
    centerCircle: {
      type: "circle",
      size: standardPitch.CENTER_CIRCLE,
      position: [midX, midY],
    },
    // Corner
    cornerArc: {
      type: "path",
      size: cornerR,
      position: [
        // top-left
        `M 0 ${cornerR} 
         A ${cornerR} ${cornerR} 
         0 0 0 
         ${cornerR} 0
        `,
        // bottom-left
        `M 0 ${axisY - cornerR} 
         A ${cornerR} ${cornerR} 
         0 0 1 
         ${cornerR} ${axisY}
        `,
        // top-right
        `M ${axisX - cornerR} 0 
         A ${cornerR} ${cornerR} 
         0 0 0 
         ${axisX} ${cornerR}
        `,
        // bottom-right
        `M ${axisX - cornerR} ${axisY} 
         A ${cornerR} ${cornerR} 
         0 0 1 
         ${axisX} ${axisY - cornerR}
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
    goalAreaHome: {
      type: "rect",
      size: [standardPitch.GOAL_AREA[1], standardPitch.GOAL_AREA[0]],
      position: [midX - standardPitch.GOAL_AREA[1] / 2, 0],
    },
    penatlySpotHome: {
      type: "circle",
      size: circleRadius,
      position: [midX, standardPitch.PENALTY_SPOT],
    },
    penaltyAreaHome: {
      type: "rect",
      size: [standardPitch.PENALTY_AREA[1], standardPitch.PENALTY_AREA[0]],
      position: [midX - standardPitch.PENALTY_AREA[1] / 2, 0],
    },
    penaltyArcHome: {
      type: "path",
      size: cornerR,
      position: `
        M ${midX + standardPitch.PENATLY_ARC} ${standardPitch.PENALTY_AREA[0]}
        A ${standardPitch.PENATLY_ARC} ${standardPitch.PENATLY_ARC}
         0 0 1 
         ${midX - standardPitch.PENATLY_ARC} ${standardPitch.PENALTY_AREA[0]}
        `,
    },
    // Away
    goalAreaAway: {
      type: "rect",
      size: [standardPitch.GOAL_AREA[1], standardPitch.GOAL_AREA[0]],
      position: [
        midX - standardPitch.GOAL_AREA[1] / 2,
        axisY - standardPitch.GOAL_AREA[0],
      ],
    },
    penatlySpotAway: {
      type: "circle",
      size: circleRadius,
      position: [midX, axisY - standardPitch.PENALTY_SPOT],
    },
    penaltyAreaAway: {
      type: "rect",
      size: [standardPitch.PENALTY_AREA[1], standardPitch.PENALTY_AREA[0]],
      position: [
        midX - standardPitch.PENALTY_AREA[1] / 2,
        axisY - standardPitch.PENALTY_AREA[0],
      ],
    },
    penaltyArcAway: {
      type: "path",
      size: cornerR,
      position: `
        M 
         ${midX + standardPitch.PENATLY_ARC} 
         ${axisY - standardPitch.PENALTY_AREA[0]}
        A 
         ${standardPitch.PENATLY_ARC} 
         ${standardPitch.PENATLY_ARC}
         0 0 0 
         ${midX - standardPitch.PENATLY_ARC} 
         ${axisY - standardPitch.PENALTY_AREA[0]}
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
      size: circleRadius,
      position: [midX, midY],
    },
    centerCircle: {
      type: "circle",
      size: standardPitch.CENTER_CIRCLE,
      position: [midX, midY],
    },
    // Corner
    cornerArc: {
      type: "path",
      size: cornerR,
      position: [
        // top-left
        `M 0 ${cornerR} 
         A ${cornerR} ${cornerR} 
         0 0 0 
         ${cornerR} 0
        `,
        // bottom-left
        `M 0 ${axisY - cornerR} 
         A ${cornerR} ${cornerR} 
         0 0 1 
         ${cornerR} ${axisY}
        `,
        // top-right
        `M ${axisX - cornerR} 0 
         A ${cornerR} ${cornerR} 
         0 0 0 
         ${axisX} ${cornerR}
        `,
        // bottom-right
        `M ${axisX - cornerR} ${axisY} 
         A ${cornerR} ${cornerR} 
         0 0 1 
         ${axisX} ${axisY - cornerR}
        `,
      ],
    },
  };

  const footpitch =
    orientation === "horizontal" ? footpitchHorizontal : footpitchVertical;

  console.log(`${orientation}: midY: ${midY}, midX: ${midX}`); // Now this logs "horizontal" if no prop is passed
  return (
    <svg width={width} height={height} style={{ backgroundColor: grassColor }}>
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
        cx={footpitch.penatlySpotHome.position[0]}
        cy={footpitch.penatlySpotHome.position[1]}
        r={footpitch.penatlySpotHome.size}
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
        cx={footpitch.penatlySpotAway.position[0]}
        cy={footpitch.penatlySpotAway.position[1]}
        r={footpitch.penatlySpotAway.size}
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

      <path
        d={footpitch.cornerArc.position[0]}
        stroke={lineColor}
        fill="none"
        strokeWidth={footpitch.cornerArc.position}
      />

      <path
        d={footpitch.cornerArc.position[1]}
        stroke={lineColor}
        fill="none"
        strokeWidth={footpitch.cornerArc.position}
      />

      <path
        d={footpitch.cornerArc.position[2]}
        stroke={lineColor}
        fill="none"
        strokeWidth={footpitch.cornerArc.position}
      />

      <path
        d={footpitch.cornerArc.position[3]}
        stroke={lineColor}
        fill="none"
        strokeWidth={footpitch.cornerArc.position}
      />
    </svg>
  );
}
