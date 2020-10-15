import React from "react";

import SVGLayer from "./SVGLayer/SVGLayer";

import "./Workspace.css";

const Workspace = ({ svgShapes, addShapes }) => {
  return (
    <div className="Workspace">
      <SVGLayer svgShapes={svgShapes} addShapes={addShapes} />
    </div>
  );
};

export default Workspace;
