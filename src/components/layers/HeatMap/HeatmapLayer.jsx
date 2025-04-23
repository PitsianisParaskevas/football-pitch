// src/components/layers/Heatmap/HeatmapLayer.jsx
import React from "react";

const HeatmapLayer = ({
  data,
  width = 800,
  height = 500,
  color = "red",
  radius = 20,
  opacity = 0.5,
}) => {
  return (
    <>
      {data.map((point, index) => {
        const cx = (point.x / 100) * width;
        const cy = height - (point.y / 100) * height;

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
