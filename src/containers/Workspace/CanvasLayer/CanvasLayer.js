import React, { useContext } from "react";

import ControlContext from "../../../contexts/control-context";

const CanvasLayer = () => {
  const { currLayer } = useContext(ControlContext);

  return (
    <canvas
      id="workspace-canvas"
      width="800"
      height="800"
      style={{
        display:
          currLayer === "canvas" || currLayer === "both" ? "block" : "none",
      }}
    ></canvas>
  );
};

export default CanvasLayer;
