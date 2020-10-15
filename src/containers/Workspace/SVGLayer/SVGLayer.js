import React, { useContext, useState, useRef } from "react";

import Line from "./shapes/Line";
import Rect from "./shapes/Rect";
import Ellipse from "./shapes/Ellipse";

import ControlContext from "../../../contexts/control-context";

import { selectShadowId } from "../../../shared/util";

const SVGLayer = () => {
  const {
    currMode,
    currBorderColor,
    currBorderWidth,
    currFillColor,
    svgShapes,
    addShape,
    selectedShapeId,
    setSelectedShapeId,
  } = useContext(ControlContext);

  const [drawing, setDrawing] = useState(false);
  const [initPoint, setInitPoint] = useState({ x: undefined, y: undefined });
  const [currPoint, setCurrPoint] = useState({ x: undefined, y: undefined });

  const svgRef = useRef(null);

  const handleMouseDown = (e) => {
    if (currMode !== "select") {
      // should create
      setDrawing(true);
      setInitPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      setCurrPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      e.preventDefault();
    } else {
      // should select
      if (e.target.nodeName === "svg") {
        // deselect
        setSelectedShapeId(undefined);
      } else {
        // select
        setSelectedShapeId(e.target.id);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (drawing) {
      setCurrPoint({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  };

  const handleMouseUp = (e) => {
    if (currMode !== "select") {
      if (!(initPoint.x === currPoint.x && initPoint.y === currPoint.y)) {
        // should create
        addShape({
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
    const filter =
      selectedShapeId && selectedShapeId === id
        ? `url(#${selectShadowId})`
        : null;
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
          filter,
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
          filter,
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
          filter,
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
      <filter
        id={selectShadowId}
        x="-100%"
        y="-100%"
        width="400%"
        height="400%"
      >
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="15"
          floodColor="rgba(0, 0, 0, 0.7)"
        />
      </filter>
      {svgShapes.map((shape, idx) => renderShape(shape, idx))}
      {drawing && renderTempShape()}
    </svg>
  );
};

export default SVGLayer;
