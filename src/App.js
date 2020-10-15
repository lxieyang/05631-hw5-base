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
  };

  addShapes = (shapeData) => {
    let shapes = [...this.state.svgShapes];
    shapes.push({
      ...shapeData,
      id: genId(),
    });
    this.setState({ svgShapes: shapes });
  };

  render() {
    const {
      currMode,
      currBorderColor,
      currBorderWidth,
      currFillColor,
      svgShapes,
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
          }}
        >
          <ControlPanel />
          <Workspace svgShapes={svgShapes} addShapes={this.addShapes} />
        </ControlContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
