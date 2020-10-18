import { createContext } from "react";

// create a context with default values
const controlContext = createContext({
  currMode: "",
  setCurrMode: () => {},
  currBorderColor: "",
  setCurrBorderColor: () => {},
  currBorderWidth: 1,
  setCurrBorderWidth: () => {},
  currFillColor: "",
  setCurrFillColor: () => {},

  shapes: [],
  shapesMap: {},
  addShape: () => {},
  updateShape: () => {},
  selectedShapeId: "", // a string or undefined
  setSelectedShapeId: () => {},
  deleteSelectedShape: () => {},
});

export default controlContext;
