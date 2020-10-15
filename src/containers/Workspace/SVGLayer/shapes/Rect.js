import React from "react";

export default ({
  id,
  x,
  y,
  width,
  height,
  fillColor,
  borderColor,
  borderWidth,
}) => {
  return (
    <rect
      key={id}
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fillColor}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />
  );
};