// src/components/DrawPitch/utils/applyDirection.js

/**
 * Adjusts x/y coordinates based on pitch orientation.
 * When the pitch is vertical, it swaps x and y values.
 *
 * @param {number} x - original x coordinate
 * @param {number} y - original y coordinate
 * @param {"horizontal" | "vertical"} direction - pitch orientation
 * @returns {{x: number, y: number}} - transformed coordinates
 */
export const applyDirection = (x, y, direction = "horizontal") => {
  return direction === "vertical" ? { x: y, y: x } : { x, y };
};
