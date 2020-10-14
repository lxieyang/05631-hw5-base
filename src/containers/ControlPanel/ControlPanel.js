import React, { useState } from "react";

import CursorImg from "../../assets/img/cursor.png";
import LineImg from "../../assets/img/line.png";

import "./ControlPanel.css";

const Layers = () => {
  const [layer, setLayer] = useState("svg"); // 'canvas', 'svg', 'both'
  return (
    <div className="Control">
      <h3>Layers: </h3>
      <label>
        <input
          type="radio"
          id="radio-show-canvas"
          name="layers-selection"
          value={"canvas"}
          checked={layer === "canvas"}
          onChange={(e) => setLayer(e.target.value)}
        />
        Show Canvas layer
      </label>
      <label>
        <input
          type="radio"
          id="radio-show-svg"
          name="layers-selection"
          value={"svg"}
          checked={layer === "svg"}
          onChange={(e) => setLayer(e.target.value)}
        />
        Show SVG layer
      </label>
      <label>
        <input
          type="radio"
          id="radio-show-both"
          name="layers-selection"
          value={"both"}
          checked={layer === "both"}
          onChange={(e) => setLayer(e.target.value)}
        />
        Show both layers
      </label>
    </div>
  );
};

const Modes = () => {
  const [mode, setMode] = useState("select"); // 'select', 'line', 'rect', 'ellipse'
  return (
    <div className="Control">
      <h3>Mode:</h3>
      <div className="Modes">
        <div
          className={["Mode", mode === "select" ? "Active" : null].join(" ")}
          onClick={() => setMode("select")}
        >
          <img src={CursorImg} alt="cursor" />
        </div>
        <div
          className={["Mode", mode === "line" ? "Active" : null].join(" ")}
          onClick={() => setMode("line")}
        >
          <img src={LineImg} alt="line" />
        </div>
        <div
          className={["Mode", mode === "rect" ? "Active" : null].join(" ")}
          onClick={() => setMode("rect")}
        >
          <div
            style={{
              backgroundColor: "yellow",
              width: 40,
              height: 30,
              border: "2px solid lightgray",
            }}
          ></div>
        </div>
        <div
          className={["Mode", mode === "ellipse" ? "Active" : null].join(" ")}
          onClick={() => setMode("ellipse")}
        >
          <div
            style={{
              backgroundColor: "yellow",
              width: 40,
              height: 30,
              border: "2px solid lightgray",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const supportedColors = [
  "transparent",
  "#fff",
  "#bfbfbf",
  "#000",
  "#fffe55",
  "#ea3323",
  "#4faeea",
  "#9fce63",
];

const ColorPicker = (props) => {
  const [selectedColor, setSelectedColor] = useState(props.defaultColor);

  return (
    <div className="Control">
      <h3>{props.title}</h3>
      <div className="Modes">
        {supportedColors.map((color, idx) => (
          <div
            key={idx}
            className={["Mode", selectedColor === color ? "Active" : null].join(
              " "
            )}
            onClick={() => setSelectedColor(color)}
          >
            <div
              className="ColorBlock"
              style={{
                backgroundColor: color,
                border: color === "transparent" ? "none" : null,
              }}
            >
              {color === "transparent" && "None"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BorderWidth = () => {
  const [borderWidth, setBorderWidth] = useState(3);

  return (
    <div className="Control">
      <h3>Border width:</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          style={{ width: 200 }}
          onChange={(e) => setBorderWidth(e.target.value)}
          min={1}
          max={30}
          value={borderWidth}
        />
        &nbsp;&nbsp;&nbsp;
        <span>{borderWidth}</span>
      </div>
    </div>
  );
};

const Delete = () => {
  return (
    <div className="Control">
      <h3>Delete:</h3>
      <div className="DeleteButtonsContainer">
        <button
          onClick={() => {
            console.log("delete");
          }}
        >
          Delete
        </button>{" "}
        &nbsp;
        <button
          onClick={() => {
            console.log("delete all");
          }}
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

const ControlPanel = () => {
  return (
    <div className="ControlPanel">
      <Layers />
      <Modes />
      <ColorPicker title={"Border color:"} defaultColor={"#000"} />
      <BorderWidth />
      <ColorPicker title={"Fill color:"} defaultColor={"#9fce63"} />
      <Delete />
    </div>
  );
};

export default ControlPanel;
