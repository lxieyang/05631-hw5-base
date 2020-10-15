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

  updateShape = (shapeId, newData) => {
    let shapes = [...this.state.svgShapes].map((shape) => {
      if (shape.id === shapeId) {
        shape = { ...shape, ...newData };
      }
      return shape;
    });

    this.setState({ svgShapes: shapes });
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
              // if (this.state.selectedShapeId && mode !== "select") {
              //   this.updateShape(this.state.selectedShapeId, { type: mode });
              // }
            },
            currBorderColor,
            setCurrBorderColor: (borderColor) => {
              this.setState({ currBorderColor: borderColor });
              if (this.state.selectedShapeId) {
                this.updateShape(this.state.selectedShapeId, { borderColor });
              }
            },
            currBorderWidth,
            setCurrBorderWidth: (borderWidth) => {
              this.setState({ currBorderWidth: borderWidth });
              if (this.state.selectedShapeId) {
                this.updateShape(this.state.selectedShapeId, { borderWidth });
              }
            },
            currFillColor,
            setCurrFillColor: (fillColor) => {
              this.setState({ currFillColor: fillColor });
              if (this.state.selectedShapeId) {
                this.updateShape(this.state.selectedShapeId, { fillColor });
              }
            },
            svgShapes,
            addShape: this.addShape,
            updateShape: this.updateShape,
            selectedShapeId,
            setSelectedShapeId: (id) => {
              this.setState({ selectedShapeId: id });
              if (id) {
                const {
                  borderColor,
                  borderWidth,
                  fillColor,
                } = this.state.svgShapes.filter((shape) => shape.id === id)[0];
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
