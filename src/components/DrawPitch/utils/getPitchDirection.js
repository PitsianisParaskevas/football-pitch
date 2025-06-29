export function getPitchDirection(dimensions) {
  const x = dimensions.TOUCH_LINE;
  const y = dimensions.GOAL_LINE;

  return {
    GOAL_POST: {
      home: [0, y / 2 - dimensions.GOAL_POST[1] / 2],
      away: [x - dimensions.GOAL_POST[0], y / 2 - dimensions.GOAL_POST[1] / 2],
    },
    GOAL_AREA: {
      home: [0, y / 2 - dimensions.GOAL_AREA[1] / 2],
      away: [x - dimensions.GOAL_AREA[0], y / 2 - dimensions.GOAL_AREA[1] / 2],
    },
    PENALTY_AREA: {
      home: [0, y / 2 - dimensions.PENALTY_AREA[1] / 2],
      away: [
        x - dimensions.PENALTY_AREA[0],
        y / 2 - dimensions.PENALTY_AREA[1] / 2,
      ],
    },
    PENALTY_SPOT: {
      home: [dimensions.PENALTY_SPOT, y / 2],
      away: [x - dimensions.PENALTY_SPOT, y / 2],
    },
    CORNER_ARC: [
      // top-left
      `M 0 ${dimensions.scaleY} A ${dimensions.scaleY} ${dimensions.scaleY} 0 0 0 ${dimensions.scaleY} 0`,
      // top-right
      `M ${x - dimensions.scaleY} 0 A ${dimensions.scaleY} ${
        dimensions.scaleY
      } 0 0 0 ${x} ${dimensions.scaleY}`,
      // bottom-left
      `M 0 ${y - dimensions.scaleY} A ${dimensions.scaleY} ${
        dimensions.scaleY
      } 0 0 1 ${dimensions.scaleY} ${y}`,
      // bottom-right
      `M ${x - dimensions.scaleY} ${y} A ${dimensions.scaleY} ${
        dimensions.scaleY
      } 0 0 1 ${x} ${y - dimensions.scaleY}`,
    ],

    HALFWAY_LINE: {
      x1: x / 2,
      y1: 0,
      x2: x / 2,
      y2: y,
    },
    CENTER_CIRCLE: [x / 2, y / 2],
    CENTER_POINT: [x / 2, y / 2],
  };
}
