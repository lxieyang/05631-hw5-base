import { createContext } from "react";

const controlContext = createContext({
  disableControl: false,
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
