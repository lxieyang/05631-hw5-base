import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Workspace from "./containers/Workspace/Workspace";

import ControlContext from "./contexts/control-context";
import { genId, defaultValues } from "./shared/util";

import "./App.css";

class App extends Component {
  state = {
    // controls
    currMode: defaultValues.mode,
    currBorderColor: defaultValues.borderColor,
    currBorderWidth: defaultValues.borderWidth,
    currFillColor: defaultValues.fillColor,

    // workspace
    shapes: [],
    shapesMap: {},
    selectedShapeId: undefined,
  };

  addShape = (shapeData) => {
    let shapes = [...this.state.shapes];
    let shapesMap = { ...this.state.shapesMap };
    const id = genId();
    shapesMap[id] = {
      ...shapeData,
      id,
    };
    shapes.push(id);
    this.setState({ shapes, shapesMap, selectedShapeId: id });
  };

  updateShape = (shapeId, newData) => {
    let shapesMap = { ...this.state.shapesMap };
    let targetShape = shapesMap[shapeId];
    shapesMap[shapeId] = { ...targetShape, ...newData };
    this.setState({ shapesMap });
  };

  deleteSelectedShape = () => {
    let shapesMap = { ...this.state.shapesMap };
    shapesMap[this.state.selectedShapeId].visible = false;
    this.setState({ shapesMap, selectedShapeId: undefined });
  };

  render() {
    const {
      currMode,
      currBorderColor,
      currBorderWidth,
      currFillColor,
      shapes,
      shapesMap,
      selectedShapeId,
    } = this.state;

    // update the context with the functions and values defined above and from state
    // and pass it to the structure below it (control panel and workspace)
    return (
      <React.Fragment>
        <ControlContext.Provider
          value={{
            currMode,
            setCurrMode: (mode) => {
              if (mode === "line") {
                this.setState({
                  currMode: mode,
                  currBorderColor: defaultValues.borderColor,
                });
              } else {
                this.setState({ currMode: mode });
              }
            },
            currBorderColor,
            setCurrBorderColor: (borderColor) => {
              this.setState({ currBorderColor: borderColor });
              if (selectedShapeId) {
                this.updateShape(selectedShapeId, { borderColor });
              }
            },
            currBorderWidth,
            setCurrBorderWidth: (borderWidth) => {
              this.setState({ currBorderWidth: borderWidth });
              if (selectedShapeId) {
                this.updateShape(selectedShapeId, { borderWidth });
              }
            },
            currFillColor,
            setCurrFillColor: (fillColor) => {
              this.setState({ currFillColor: fillColor });
              if (selectedShapeId) {
                this.updateShape(selectedShapeId, { fillColor });
              }
            },
            shapes,
            shapesMap,
            addShape: this.addShape,
            updateShape: this.updateShape,
            selectedShapeId,
            setSelectedShapeId: (id) => {
              this.setState({ selectedShapeId: id });
              if (id) {
                const { borderColor, borderWidth, fillColor } = shapesMap[
                  shapes.filter((shapeId) => shapeId === id)[0]
                ];
                this.setState({
                  currBorderColor: borderColor,
                  currBorderWidth: borderWidth,
                  currFillColor: fillColor,
                });
              }
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
