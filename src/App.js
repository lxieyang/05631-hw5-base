import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Workspace from "./containers/Workspace/Workspace";

import ControlContext from "./contexts/control-context";

import { genId } from "./shared/util";

import "./App.css";

class App extends Component {
  state = {
    // controls
    currMode: "line", // 'select', 'line', 'rect', 'ellipse'
    currBorderColor: "#000",
    currBorderWidth: 3,
    currFillColor: "#9fce63",

    // workspace
    svgShapes: [],
    selectedShapeId: undefined,
  };

  addShape = (shapeData) => {
    let shapes = [...this.state.svgShapes];
    const id = genId();
    shapes.push({
      ...shapeData,
      id,
    });
    this.setState({ svgShapes: shapes, selectedShapeId: id });
  };

  deleteSelectedShape = () => {
    let shapes = [...this.state.svgShapes].filter(
      (shape) => shape.id !== this.state.selectedShapeId
    );

    this.setState({ svgShapes: shapes, selectedShapeId: undefined });
  };

  render() {
    const {
      currMode,
      currBorderColor,
      currBorderWidth,
      currFillColor,
      svgShapes,
      selectedShapeId,
    } = this.state;

    return (
      <React.Fragment>
        <ControlContext.Provider
          value={{
            currMode,
            setCurrMode: (mode) => {
              this.setState({ currMode: mode });
            },
            currBorderColor,
            setCurrBorderColor: (borderColor) => {
              this.setState({ currBorderColor: borderColor });
            },
            currBorderWidth,
            setCurrBorderWidth: (borderWidth) => {
              this.setState({ currBorderWidth: borderWidth });
            },
            currFillColor,
            setCurrFillColor: (fillColor) => {
              this.setState({ currFillColor: fillColor });
            },
            svgShapes,
            addShape: this.addShape,
            selectedShapeId,
            setSelectedShapeId: (id) => {
              this.setState({ selectedShapeId: id });
            },
            deleteSelectedShape: this.deleteSelectedShape,
          }}
        >
          <ControlPanel />
          <Workspace />
        </ControlContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
