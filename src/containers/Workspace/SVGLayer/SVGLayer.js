import React, { useContext } from "react";

import ControlContext from "../../../contexts/control-context";

const SVGLayer = () => {
  const { currLayer } = useContext(ControlContext);

  return (
    <svg
      id="workspace-svg"
      width="800"
      height="800"
      style={{
        display: currLayer === "svg" || currLayer === "both" ? "block" : "none",
      }}
    ></svg>
  );
};

export default SVGLayer;
