import React, { useContext } from "react";

import CursorImg from "../../assets/img/cursor.png";
import LineImg from "../../assets/img/line.png";
import supportedColors from "../../shared/supportedColors";
import ControlContext from "../../contexts/control-context";

import "./ControlPanel.css";

const Layers = () => {
  const { currLayer, setCurrLayer } = useContext(ControlContext);

  return (
    <div className="Control">
      <h3>Layers: </h3>
      <label>
        <input
          type="radio"
          id="radio-show-canvas"
          name="layers-selection"
          value={"canvas"}
          checked={currLayer === "canvas"}
          onChange={(e) => setCurrLayer(e.target.value)}
        />
        Show Canvas layer
      </label>
      <label>
        <input
          type="radio"
          id="radio-show-svg"
          name="layers-selection"
          value={"svg"}
          checked={currLayer === "svg"}
          onChange={(e) => setCurrLayer(e.target.value)}
        />
        Show SVG layer
      </label>
      <label>
        <input
          type="radio"
          id="radio-show-both"
          name="layers-selection"
          value={"both"}
          checked={currLayer === "both"}
          onChange={(e) => setCurrLayer(e.target.value)}
        />
        Show both layers
      </label>
    </div>
  );
};

const Modes = () => {
  const { currMode, setCurrMode, disableControl } = useContext(ControlContext);

  return (
    <div className="Control">
      <h3>Mode:</h3>
      <div className={["Modes", disableControl ? "Disabled" : null].join(" ")}>
        <div
          className={["Mode", currMode === "select" ? "Active" : null].join(
            " "
          )}
          onClick={() => setCurrMode("select")}
        >
          <img src={CursorImg} alt="cursor" />
        </div>
        <div
          className={["Mode", currMode === "line" ? "Active" : null].join(" ")}
          onClick={() => setCurrMode("line")}
        >
          <img src={LineImg} alt="line" />
        </div>
        <div
          className={["Mode", currMode === "rect" ? "Active" : null].join(" ")}
          onClick={() => setCurrMode("rect")}
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
          className={["Mode", currMode === "ellipse" ? "Active" : null].join(
            " "
          )}
          onClick={() => setCurrMode("ellipse")}
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

const ColorPicker = (props) => {
  const { currColor, setCurrColor } = props;
  const { disableControl } = useContext(ControlContext);

  return (
    <div className="Control">
      <h3>{props.title}</h3>
      <div className={["Modes", disableControl ? "Disabled" : null].join(" ")}>
        {supportedColors.map((color, idx) => (
          <div
            key={idx}
            className={["Mode", currColor === color ? "Active" : null].join(
              " "
            )}
            onClick={() => setCurrColor(color)}
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

const BorderColor = () => {
  const { currBorderColor, setCurrBorderColor } = useContext(ControlContext);

  return (
    <ColorPicker
      title={"Border color:"}
      currColor={currBorderColor}
      setCurrColor={setCurrBorderColor}
    />
  );
};

const FillColor = () => {
  const { currFillColor, setCurrFillColor } = useContext(ControlContext);

  return (
    <ColorPicker
      title={"Fill color:"}
      currColor={currFillColor}
      setCurrColor={setCurrFillColor}
    />
  );
};

const BorderWidth = () => {
  const { currBorderWidth, setCurrBorderWidth, disableControl } = useContext(
    ControlContext
  );

  return (
    <div className="Control">
      <h3>Border width:</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="range"
          style={{ width: 200 }}
          onChange={(e) => setCurrBorderWidth(e.target.value)}
          min={1}
          max={30}
          value={currBorderWidth}
          disabled={disableControl}
        />
        &nbsp;&nbsp;&nbsp;
        <span>{currBorderWidth}</span>
      </div>
    </div>
  );
};

const Delete = () => {
  const { disableControl } = useContext(ControlContext);

  return (
    <div className="Control">
      <h3>Delete:</h3>
      <div className="DeleteButtonsContainer">
        <button
          onClick={() => {
            console.log("delete");
          }}
          disabled={disableControl}
        >
          Delete
        </button>{" "}
        &nbsp;
        <button
          onClick={() => {
            console.log("delete all");
          }}
          disabled={disableControl}
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
      <BorderColor />
      <BorderWidth />
      <FillColor />
      <Delete />
    </div>
  );
};

export default ControlPanel;
