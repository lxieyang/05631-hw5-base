import React, { useContext, useState, useRef } from "react";

import Line from "./shapes/Line";
import Rect from "./shapes/Rect";
import Ellipse from "./shapes/Ellipse";

import ControlContext from "../../../contexts/control-context";

const SVGLayer = ({ svgShapes }) => {
  const {
    currLayer,
    currMode,
    currBorderColor,
    currBorderWidth,
    currFillColor,
  } = useContext(ControlContext);

  const [drawing, setDrawing] = useState(false);
  const [initPoint, setInitPoint] = useState({ x: undefined, y: undefined });
  const [currPoint, setCurrPoint] = useState({ x: undefined, y: undefined });

  const svgRef = useRef(null);

  const handleMouseDown = (e) => {
    // console.log("mouse down on svg layer");
    if (currMode !== "select") {
      // should create
      setDrawing(true);
      setInitPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      e.preventDefault();
    } else {
      // should select
    }
  };

  const handleMouseMove = (e) => {
    // console.log("mouse move on svg layer");
    if (drawing) {
      setCurrPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  };

  const handleMouseUp = (e) => {
    // console.log("mouse up on svg layer");
    if (currMode !== "select") {
      // should create
      setDrawing(false);
      setInitPoint({ x: undefined, y: undefined });
      setCurrPoint({ x: undefined, y: undefined });
    } else {
    }
  };

  const renderShape = (shape, lock) => {};

  const renderTempShape = () => {
    if (
      initPoint.x !== undefined &&
      initPoint.y !== undefined &&
      currPoint.x !== undefined &&
      currPoint.y !== undefined
    ) {
      switch (currMode) {
        case "line": {
          return React.createElement(Line, {
            id: "temp",
            x1: initPoint.x,
            y1: initPoint.y,
            x2: currPoint.x,
            y2: currPoint.y,
            borderColor: currBorderColor,
            borderWidth: currBorderWidth,
          });
        }
        case "rect": {
          return React.createElement(Rect, {
            id: "temp",
            x: Math.min(initPoint.x, currPoint.x),
            y: Math.min(initPoint.y, currPoint.y),
            width: Math.abs(currPoint.x - initPoint.x),
            height: Math.abs(currPoint.y - initPoint.y),
            fillColor: currFillColor,
            borderColor: currBorderColor,
            borderWidth: currBorderWidth,
          });
        }
        case "ellipse": {
          let x = Math.min(currPoint.x, initPoint.x);
          let y = Math.min(currPoint.y, initPoint.y);
          let w = Math.abs(currPoint.x - initPoint.x);
          let h = Math.abs(currPoint.y - initPoint.y);

          return React.createElement(Ellipse, {
            id: "temp",
            cx: x + w / 2,
            cy: y + h / 2,
            rx: w / 2,
            ry: h / 2,
            fillColor: currFillColor,
            borderColor: currBorderColor,
            borderWidth: currBorderWidth,
          });
        }
        default: {
          break;
        }
      }
    }
  };

  return (
    <svg
      id="workspace-svg"
      width="800"
      height="800"
      ref={svgRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        display: currLayer === "svg" || currLayer === "both" ? "block" : "none",
      }}
    >
      {svgShapes.map((shape, idx) => {
        return null;
      })}
      {drawing && renderTempShape()}
    </svg>
  );
};

export default SVGLayer;
