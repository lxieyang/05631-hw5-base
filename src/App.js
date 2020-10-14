import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Workspace from "./containers/Workspace/Workspace";

import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <ControlPanel />
        <Workspace />
      </React.Fragment>
    );
  }
}

export default App;
