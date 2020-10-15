import { createContext } from "react";

const controlContext = createContext({
  currMode: "",
  setCurrMode: () => {},
  currBorderColor: "",
  setCurrBorderColor: () => {},
  currBorderWidth: 1,
  setCurrBorderWidth: () => {},
  currFillColor: "",
  setCurrFillColor: () => {},

  selectedShapeId: "", // a string or undefined
  setSelectedShapeId: () => {},
});

export default controlContext;
