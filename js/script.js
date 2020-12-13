import { createStateManager } from "./models/StateManger.js";
import Screen, { createScreen, getMaxDimensions } from "./models/Screen.js";
import Color, { createColor, removeColor } from "./models/Color.js";
import Layer, { createLayer, removeLayer } from "./models/Layer.js";
import { toolAction } from "./models/Tool.js";
import { createPen } from "./tools/Pen.js";
import { createEraser } from "./tools/Eraser.js";
import { renderChanges, renderState, setStateButtons } from "./utils/index.js";

import initialState from "./setup.js";

const imageNameElement = document.getElementById("title");
const createLayerElement = document.getElementById("new-layer");
const removeLayerElement = document.getElementById("remove-layer");
const createColorElement = document.getElementById("new-color");
const removeColorElement = document.getElementById("remove-color");
const redoElement = document.getElementById("redo");
const undoElement = document.getElementById("undo");
const saveElement = document.getElementById("save");
const canvasElement = document.querySelector("canvas");
const positionElement = document.getElementById("position");
const displayElement = document.getElementById("display");
const colorInputElement = document.getElementById("color-input");

var imageName = imageNameElement.innerHTML;

const screen = createScreen(getMaxDimensions(displayElement), canvasElement);
const stateManager = createStateManager();
/**
 * Application's main function
 */
function main() {
  // Loads tools
  createPen();
  createEraser();

  // Handles image name change
  function updateImageName() {
    imageName = imageNameElement.innerHTML;
  }

  // Create layer
  function createNewLayer() {
    const layer = createLayer();

    // Drag logic
    layer.onDrag = (sourceIndex, targetIndex) => {
      const { layerList } = Layer;

      const source = layerList[sourceIndex];
      const target = layerList[targetIndex];

      layerList[sourceIndex] = target;
      layerList[targetIndex] = source;

      Layer.renderLayerList();
      screen.renderLayers(layerList);
    };

    // Toggle visibility reload
    layer.onToggle = () => screen.renderLayers(Layer.layerList);
  }

  // Remove layer
  function removeCurrentLayer() {
    const { currentLayer } = Layer;
    const { colorList } = Color;

    // Removes and reloads
    removeLayer(currentLayer);
    screen.renderLayers(Layer.layerList);
    stateManager.update(Layer.layerList, colorList);
  }

  // Create color
  function createNewColor() {
    createColor("#ffffff", colorInputElement);
  }

  // Remove color
  function removeCurrentColor() {
    const { colorList, currentColor } = Color;
    const { layerList } = Layer;

    removeColor(currentColor);
    stateManager.update(layerList, colorList);
  }

  // Save logic
  function generateImage() {
    stateManager.generateImage(screen, imageName);
  }

  // Undo logic
  function undoChanges() {
    const backState = stateManager.backState();

    renderChanges(backState, screen);
    setStateButtons(undoElement, redoElement, stateManager);
  }

  // Redo logic
  function redoChanges() {
    const forwardState = stateManager.forwardState();

    renderChanges(forwardState, screen);
    setStateButtons(undoElement, redoElement, stateManager);
  }

  // Handle resize
  function handleResize() {
    const { layerList } = Layer;

    screen.setScreenSize(getMaxDimensions(displayElement));
    screen.renderLayers(layerList);
  }

  // Screen actions
  const screenClick = (e) => toolAction(screen, "clickAction", e);
  const screenHold = (e) => toolAction(screen, "holdAction", e);
  const screenChange = () => {
    const currentColor = Color.currentColor;
    const currentLayer = Layer.currentLayer;
    const currentStateId = stateManager.stateIndex + 1;

    // Removes next states
    stateManager.stateList = stateManager.stateList.slice(0, currentStateId);

    // Updates state
    stateManager.update(
      Layer.layerList,
      Color.colorList,
      currentLayer,
      currentColor
    );

    // Sets undo element enabled
    setStateButtons(undoElement, redoElement, stateManager);
  };
  const screenHover = (e) => {
    const { x, y } = screen.getGridPositionOnScreen(e.clientX, e.clientY);
    positionElement.innerHTML = `(${x}, ${y})`;
  };

  // Screen logic
  screen.onClick = screenClick;
  screen.onHold = screenHold;
  screen.onHover = screenHover;
  screen.onChange = screenChange;

  // Listeners
  imageNameElement.addEventListener("input", updateImageName);
  createLayerElement.addEventListener("click", createNewLayer);
  removeLayerElement.addEventListener("click", removeCurrentLayer);
  createColorElement.addEventListener("click", createNewColor);
  removeColorElement.addEventListener("click", removeCurrentColor);
  redoElement.addEventListener("click", redoChanges);
  undoElement.addEventListener("click", undoChanges);
  saveElement.addEventListener("click", generateImage);
  window.addEventListener("resize", handleResize);
}

/**
 * Set's application's initial state
 */
function setup() {
  renderState(initialState, screen, colorInputElement);

  stateManager.update(
    Layer.layerList,
    Color.colorList,
    Layer.currentLayer,
    Color.currentColor
  );
}

// Source code
window.onload = () => {
  main();
  setup();
};
