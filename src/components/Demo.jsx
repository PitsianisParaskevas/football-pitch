export default function Demo({
  direction = "horizontal",
  grassColor = "#007A57",
  lineColor = "#fff",
  lineWidth = 2,
  goalPostWidth = 5,
  goalPostColor = "#000",
  circleRadius = 2,
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
    direction === "horizontal"
      ? standardPitch.TOUCH_LINE
      : standardPitch.GOAL_LINE;
  const height =
    direction === "horizontal"
      ? standardPitch.GOAL_LINE
      : standardPitch.TOUCH_LINE;

  const axisX = width;
  const axisY = height;
  const midX = axisX / 2;
  const midY = axisY / 2;

  const footpitchHorizontal = {
    pitch: {
      type: "rect",
      dimention: [width, height],
      direction: [0, 0],
    },
    goalAreaHome: {
      type: "rect",
      dimention: [standardPitch.GOAL_AREA[0], standardPitch.GOAL_AREA[1]],
      direction: [0, midY - standardPitch.GOAL_AREA[1] / 2],
    },
    penatlySpotHome: {
      type: "circle",
      dimention: circleRadius,
      direction: [standardPitch.PENALTY_SPOT, midY],
    },
    penaltyAreaHome: {
      type: "rect",
      dimention: [standardPitch.PENALTY_AREA[0], standardPitch.PENALTY_AREA[1]],
      direction: [0, midY - standardPitch.PENALTY_AREA[1] / 2],
    },
    penaltyArcHome: {
      type: "path",
      dimention: cornerR,
      direction: `M  ${standardPitch.PENALTY_AREA[0]} ${
        midY - standardPitch.PENATLY_ARC
      }
         A
        ${standardPitch.PENATLY_ARC} ${standardPitch.PENATLY_ARC}
         0 1 1 
        ${standardPitch.PENALTY_AREA[0]} ${midY + standardPitch.PENATLY_ARC}
        `,
    },
    halfwayLine: {
      type: "line",
      dimention: lineWidth,
      direction: [midX, 0, midX, axisY],
    },
    centerPoint: {
      type: "circle",
      dimention: circleRadius,
      direction: [midX, midY],
    },
    centerCircle: {
      type: "circle",
      dimention: standardPitch.CENTER_CIRCLE,
      direction: [midX, midY],
    },
    cornerArc: {
      type: "path",
      dimention: cornerR,
      direction: [
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
      dimention: [width, height],
      direction: [0, 0],
    },
    goalAreaHome: {
      type: "rect",
      dimention: [standardPitch.GOAL_AREA[1], standardPitch.GOAL_AREA[0]],
      direction: [midX - standardPitch.GOAL_AREA[1] / 2, 0],
    },
    penatlySpotHome: {
      type: "circle",
      dimention: circleRadius,
      direction: [midX, standardPitch.PENALTY_SPOT],
    },
    penaltyAreaHome: {
      type: "rect",
      dimention: [standardPitch.PENALTY_AREA[1], standardPitch.PENALTY_AREA[0]],
      direction: [midX - standardPitch.PENALTY_AREA[1] / 2, 0],
    },
    penaltyArcHome: {
      type: "path",
      dimention: cornerR,
      direction: `
        M ${midX + standardPitch.PENATLY_ARC} ${standardPitch.PENALTY_AREA[0]}
        A ${standardPitch.PENATLY_ARC} ${standardPitch.PENATLY_ARC}
         0 0 1 
         ${midX - standardPitch.PENATLY_ARC} ${standardPitch.PENALTY_AREA[0]}
        `,
    },
    halfwayLine: {
      type: "line",
      dimention: lineWidth,
      direction: [0, midY, axisY, midY],
    },
    centerPoint: {
      type: "circle",
      dimention: circleRadius,
      direction: [midX, midY],
    },
    centerCircle: {
      type: "circle",
      dimention: standardPitch.CENTER_CIRCLE,
      direction: [midX, midY],
    },
    cornerArc: {
      type: "path",
      dimention: cornerR,
      direction: [
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
    direction === "horizontal" ? footpitchHorizontal : footpitchVertical;

  console.log(`${direction}: midY: ${midY}, midX: ${midX}`); // Now this logs "horizontal" if no prop is passed
  return (
    <svg width={width} height={height} style={{ backgroundColor: grassColor }}>
      {/* Outline */}
      <rect
        width={footpitch.pitch.dimention[0]}
        height={footpitch.pitch.dimention[1]}
        x={footpitch.pitch.dimention[0]}
        y={footpitch.pitch.dimention[1]}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      {/* Areas */}
      {/* Home */}
      <rect
        width={footpitch.goalAreaHome.dimention[0]}
        height={footpitch.goalAreaHome.dimention[1]}
        x={footpitch.goalAreaHome.direction[0]}
        y={footpitch.goalAreaHome.direction[1]}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      <rect
        width={footpitch.penaltyAreaHome.dimention[0]}
        height={footpitch.penaltyAreaHome.dimention[1]}
        x={footpitch.penaltyAreaHome.direction[0]}
        y={footpitch.penaltyAreaHome.direction[1]}
        stroke={lineColor}
        fill="none"
        strokeWidth={lineWidth}
      />

      <circle
        cx={footpitch.penatlySpotHome.direction[0]}
        cy={footpitch.penatlySpotHome.direction[1]}
        r={footpitch.penatlySpotHome.dimention}
        fill={lineColor}
      />

      <path
        d={footpitch.penaltyArcHome.direction}
        stroke={"#fff"}
        fill="none"
        strokeWidth={footpitch.penaltyArcHome.dimention}
      />

      {/* Half */}

      <line
        x1={footpitch.halfwayLine.direction[0]}
        y1={footpitch.halfwayLine.direction[1]}
        x2={footpitch.halfwayLine.direction[2]}
        y2={footpitch.halfwayLine.direction[3]}
        strokeWidth={footpitch.halfwayLine.dimention}
        stroke={lineColor}
      />

      <circle
        cx={footpitch.centerPoint.direction[0]}
        cy={footpitch.centerPoint.direction[1]}
        r={footpitch.centerPoint.dimention}
        fill={lineColor}
      />

      <circle
        cx={footpitch.centerCircle.direction[0]}
        cy={footpitch.centerCircle.direction[1]}
        r={footpitch.centerCircle.dimention}
        stroke={lineColor}
        fill="none"
      />

      {/* Corner */}

      <path
        d={footpitch.cornerArc.direction[0]}
        stroke={lineColor}
        fill="none"
        strokeWidth={footpitch.cornerArc.direction}
      />

      <path
        d={footpitch.cornerArc.direction[1]}
        stroke={lineColor}
        fill="none"
        strokeWidth={footpitch.cornerArc.direction}
      />

      <path
        d={footpitch.cornerArc.direction[2]}
        stroke={lineColor}
        fill="none"
        strokeWidth={footpitch.cornerArc.direction}
      />

      <path
        d={footpitch.cornerArc.direction[3]}
        stroke={lineColor}
        fill="none"
        strokeWidth={footpitch.cornerArc.direction}
      />

      {/* Away */}
    </svg>
  );
}
