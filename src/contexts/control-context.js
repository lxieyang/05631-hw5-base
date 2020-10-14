import React, { createContext } from "react";

const controlContext = createContext({
  currLayer: "",
  setCurrLayer: () => {},
  currMode: "",
  setCurrMode: () => {},
  currBorderColor: "",
  setCurrBorderColor: () => {},
  currBorderWidth: 1,
  setCurrBorderWidth: () => {},
  currFillColor: "",
  setCurrFillColor: () => {},
});

export default controlContext;
