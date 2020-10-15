import React from "react";

export default ({ id, x1, x2, y1, y2, borderColor, borderWidth }) => {
  return (
    <line
      key={id}
      id={id}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />
  );
};