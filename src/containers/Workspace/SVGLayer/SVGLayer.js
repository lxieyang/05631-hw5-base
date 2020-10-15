import React, { useContext, useState, useRef } from "react";

import Line from "./shapes/Line";
import Rect from "./shapes/Rect";
import Ellipse from "./shapes/Ellipse";

import ControlContext from "../../../contexts/control-context";

const SVGLayer = ({ svgShapes, addShapes }) => {
  const {
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
      setCurrPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
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
      if (!(initPoint.x === currPoint.x && initPoint.y === currPoint.y)) {
        // should create
        addShapes({
          type: currMode,
          initCoords: initPoint,
          finalCoords: currPoint,
          borderColor: currBorderColor,
          borderWidth: currBorderWidth,
          fillColor: currFillColor,
        });
      }

      setDrawing(false);
      setInitPoint({ x: undefined, y: undefined });
      setCurrPoint({ x: undefined, y: undefined });
    } else {
    }
  };

  const genShape = (shapeData, key = undefined) => {
    const {
      initCoords,
      finalCoords,
      borderColor,
      borderWidth,
      fillColor,
      id,
    } = shapeData;
    switch (shapeData.type) {
      case "line": {
        return React.createElement(Line, {
          x1: initCoords.x,
          y1: initCoords.y,
          x2: finalCoords.x,
          y2: finalCoords.y,
          borderColor,
          borderWidth,
          id,
          key,
        });
      }
      case "rect": {
        return React.createElement(Rect, {
          x: Math.min(initCoords.x, finalCoords.x),
          y: Math.min(initCoords.y, finalCoords.y),
          width: Math.abs(finalCoords.x - initCoords.x),
          height: Math.abs(finalCoords.y - initCoords.y),
          fillColor,
          borderColor,
          borderWidth,
          id,
          key,
        });
      }
      case "ellipse": {
        let x = Math.min(finalCoords.x, initCoords.x);
        let y = Math.min(finalCoords.y, initCoords.y);
        let w = Math.abs(finalCoords.x - initCoords.x);
        let h = Math.abs(finalCoords.y - initCoords.y);

        return React.createElement(Ellipse, {
          cx: x + w / 2,
          cy: y + h / 2,
          rx: w / 2,
          ry: h / 2,
          fillColor,
          borderColor,
          borderWidth,
          id,
          key,
        });
      }
      default: {
        return null;
      }
    }
  };

  const renderShape = (shapeData, key) => {
    return genShape(shapeData, key);
  };

  const renderTempShape = () => {
    if (
      initPoint.x !== undefined &&
      initPoint.y !== undefined &&
      currPoint.x !== undefined &&
      currPoint.y !== undefined
    ) {
      return genShape({
        type: currMode,
        initCoords: initPoint,
        finalCoords: currPoint,
        borderColor: currBorderColor,
        borderWidth: currBorderWidth,
        fillColor: currFillColor,
      });
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
    >
      {svgShapes.map((shape, idx) => renderShape(shape, idx))}
      {drawing && renderTempShape()}
    </svg>
  );
};

export default SVGLayer;
