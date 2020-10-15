import React, { useContext } from "react";

import CursorImg from "../../assets/img/cursor.png";
import LineImg from "../../assets/img/line.png";
import supportedColors from "../../shared/supportedColors";
import ControlContext from "../../contexts/control-context";

import "./ControlPanel.css";

const Modes = () => {
  const { currMode, setCurrMode } = useContext(ControlContext);

  return (
    <div className="Control">
      <h3>Mode:</h3>
      <div className="Modes">
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

  return (
    <div className="Control">
      <h3>{props.title}</h3>
      <div className="Modes">
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
  const { currBorderWidth, setCurrBorderWidth } = useContext(ControlContext);

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
        />
        &nbsp;&nbsp;&nbsp;
        <span>{currBorderWidth}</span>
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
          <span role="img" aria-label="undo">
            🚮
          </span>
          Delete
        </button>{" "}
      </div>
    </div>
  );
};

const UndoRedo = () => {
  return (
    <div className="Control">
      <h3>Undo / Redo:</h3>
      <div className="UndoRedoButtonsContainer">
        <button
          onClick={() => {
            console.log("undo");
          }}
        >
          <span role="img" aria-label="undo">
            ↩️
          </span>{" "}
          Undo
        </button>{" "}
        <button
          onClick={() => {
            console.log("redo");
          }}
        >
          <span role="img" aria-label="redo">
            ↪️
          </span>
          Redo
        </button>
      </div>
    </div>
  );
};

const ControlPanel = () => {
  return (
    <div className="ControlPanel">
      {/* <Layers /> */}
      <Modes />
      <BorderColor />
      <BorderWidth />
      <FillColor />
      <Delete />
      <UndoRedo />
    </div>
  );
};

export default ControlPanel;
