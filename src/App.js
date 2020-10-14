import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Workspace from "./containers/Workspace/Workspace";

import ControlContext from "./contexts/control-context";

import "./App.css";

class App extends Component {
  state = {
    currLayer: "svg", // 'canvas', 'svg', 'both'
    currMode: "select", // 'select', 'line', 'rect', 'ellipse'
    currBorderColor: "#000",
    currBorderWidth: 3,
    currFillColor: "#9fce63",
  };

  render() {
    const {
      currLayer,
      currMode,
      currBorderColor,
      currBorderWidth,
      currFillColor,
    } = this.state;
    return (
      <React.Fragment>
        <ControlContext.Provider
          value={{
            currLayer,
            setCurrLayer: (layer) => {
              this.setState({ currLayer: layer });
            },
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
          <Workspace />
        </ControlContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
