// pitchDimensions.js

export const standardPitch = {
  TOUCH_LINE: 105,
  GOAL_LINE: 68,
  GOAL_POST: [2, 8],
  GOAL_AREA: [6, 20],
  PENALTY_AREA: [18, 44],
  PENALTY_SPOT: 12,
  PENATLY_ARC: 10,
  CORNER_ARC: 5.5,
  HALFWAY_LINE: 68,
  CENTER_CIRCLE: 10,
  CENTER_POINT: 1,
};

/**
 * Calculates scaled pitch dimensions from the given SVG canvas size.
 * Assumes pitch is laid out horizontally (length → width, width → height).
 * Rendering direction is handled later by applyDirection().
 *
 * @param {number} svgWidth - width of the SVG canvas (in px)
 * @param {number} svgHeight - height of the SVG canvas (in px)
 * @returns {object} - pitch geometry scaled to fit SVG size
 */
export function getScaledPitchDimensions(svgWidth, svgHeight) {
  // Always assume horizontal layout for scaling
  const scaleX = svgWidth / standardPitch.TOUCH_LINE;
  const scaleY = svgHeight / standardPitch.GOAL_LINE;

  // const width = scaleX.toFixed(2);
  // const height = scaleY.toFixed(2);

  return {
    TOUCH_LINE: standardPitch.TOUCH_LINE * scaleX,
    GOAL_LINE: standardPitch.GOAL_LINE * scaleY,

    GOAL_POST: [
      standardPitch.GOAL_POST[0] * scaleX,
      standardPitch.GOAL_POST[1] * scaleY,
    ],

    GOAL_AREA: [
      standardPitch.GOAL_AREA[0] * scaleX,
      standardPitch.GOAL_AREA[1] * scaleY,
    ],

    PENALTY_AREA: [
      standardPitch.PENALTY_AREA[0] * scaleX,
      standardPitch.PENALTY_AREA[1] * scaleY,
    ],

    PENALTY_SPOT: standardPitch.PENALTY_SPOT * scaleX,
    PENATLY_ARC: standardPitch.PENATLY_ARC * scaleX,
    CORNER_ARC: standardPitch.CORNER_ARC * scaleX,
    HALFWAY_LINE: standardPitch.HALFWAY_LINE * scaleY,
    CENTER_CIRCLE: standardPitch.CENTER_CIRCLE * scaleX,
    CENTER_POINT: standardPitch.CENTER_POINT * scaleX,

    scaleX,
    scaleY,
  };
}
