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

  svgShapes: [],
  addShape: () => {},
  selectedShapeId: "", // a string or undefined
  setSelectedShapeId: () => {},
  deleteSelectedShape: () => {},
});

export default controlContext;
