import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Workspace from "./containers/Workspace/Workspace";

import ControlContext from "./contexts/control-context";

import "./App.css";

class App extends Component {
  state = {
    // controls
    disableControl: false, // true, false
    currLayer: "svg", // 'canvas', 'svg', 'both'
    currMode: "line", // 'select', 'line', 'rect', 'ellipse'
    currBorderColor: "#000",
    currBorderWidth: 3,
    currFillColor: "#9fce63",

    // workspace
    svgShapes: [],
  };

  render() {
    const {
      disableControl,
      currLayer,
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
            disableControl,
            currLayer,
            setCurrLayer: (layer) => {
              this.setState({
                currLayer: layer,
                disableControl: layer === "both" ? true : false,
              });
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
          <Workspace svgShapes={svgShapes} />
        </ControlContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
