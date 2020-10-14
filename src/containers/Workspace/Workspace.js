import React from "react";

import CanvasLayer from "./CanvasLayer/CanvasLayer";
import SVGLayer from "./SVGLayer/SVGLayer";

import "./Workspace.css";

const Workspace = () => {
  return (
    <div className="Workspace">
      <CanvasLayer />
      <SVGLayer />
    </div>
  );
};

export default Workspace;
