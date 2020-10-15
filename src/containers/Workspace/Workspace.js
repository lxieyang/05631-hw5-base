import React from "react";

import SVGLayer from "./SVGLayer/SVGLayer";

import "./Workspace.css";

const Workspace = ({ svgShapes }) => {
  return (
    <div className="Workspace">
      <SVGLayer svgShapes={svgShapes} />
    </div>
  );
};

export default Workspace;
