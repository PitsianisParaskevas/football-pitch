import React, { useContext } from "react";
import { PitchContext } from "../../DrawPitch/DrawPitch";

const HeatmapLayer = ({
  data,
  color = "#F7A82D",
  radius = 10,
  opacity = 0.5,
}) => {
  const { width, height, orientation } = useContext(PitchContext);

  return (
    <>
      {data.map((point, index) => {
        let cx, cy;

        if (orientation === "horizontal") {
          cx = (point.x / 100) * width;
          cy = height - (point.y / 100) * height;
        } else {
          cx = height - (point.y / 100) * height;
          cy = (point.x / 100) * width;
        }

        return (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r={radius}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </>
  );
};

export default HeatmapLayer;
