import React from "react";

import CanvasLayer from "./CanvasLayer/CanvasLayer";
import SVGLayer from "./SVGLayer/SVGLayer";

import "./Workspace.css";

const Workspace = ({ svgShapes }) => {
  return (
    <div className="Workspace">
      <CanvasLayer />
      <SVGLayer svgShapes={svgShapes} />
    </div>
  );
};

export default Workspace;
