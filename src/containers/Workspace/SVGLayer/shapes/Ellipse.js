import React from "react";

export default ({
  id,
  cx,
  cy,
  rx,
  ry,
  fillColor,
  borderColor,
  borderWidth,
}) => {
  return (
    <ellipse
      key={id}
      id={id}
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={fillColor}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />
  );
};
