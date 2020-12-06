import { createStateManager } from "./models/StateManger.js";
import Screen, { createScreen, getMaxDimensions } from "./models/Screen.js";
import Color, { createColor, removeColor } from "./models/Color.js";
import Layer, { createLayer, removeLayer } from "./models/Layer.js";
import { toolAction } from "./models/Tool.js";
import { createPen } from "./tools/Pen.js";
import { createEraser } from "./tools/Eraser.js";

const imageNameElement = document.getElementById("title");
const createLayerElement = document.getElementById("new-layer");
const removeLayerElement = document.getElementById("remove-layer");
const createColorElement = document.getElementById("new-color");
const removeColorElement = document.getElementById("remove-color");
const redoElement = document.getElementById("redo");
const undoElement = document.getElementById("undo");
const saveElement = document.getElementById("save");
const canvasElement = document.querySelector("canvas");
const displayElement = document.getElementById("display");
const colorInputElement = document.getElementById("color-input");

var imageName = imageNameElement.innerHTML;

/**
 * Application's main function
 */
function main() {
  const screen = createScreen(getMaxDimensions(displayElement), canvasElement);
  const stateManager = createStateManager();

  // Handles image name change
  imageNameElement.addEventListener("input", (e) => {
    imageName = imageNameElement.innerHTML;
  });

  // Create layer
  createLayerElement.addEventListener("click", () => {
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
  });

  // Remove layer
  removeLayerElement.addEventListener("click", () => {
    const { currentLayer } = Layer;

    // Removes and reloads
    removeLayer(currentLayer);
    screen.renderLayers(Layer.layerList);
  });

  // Create color
  createColorElement.addEventListener("click", () =>
    createColor("#ffffff", colorInputElement)
  );

  // Remove color
  removeColorElement.addEventListener("click", () =>
    removeColor(Color.currentColor)
  );

  // State logic
  redoElement.addEventListener("click", () => {});
  undoElement.addEventListener("click", () => {});

  // Save logic
  saveElement.addEventListener("click", () => {
    stateManager.generateImage(screen, imageName);
  });

  // Screen logic
  screen.onClick = (e) => toolAction(screen, "clickAction", e);
  screen.onHold = (e) => toolAction(screen, "holdAction", e);
  screen.onChange = () => {};
}

// Handle resize
window.addEventListener("resize", () => {
  const { layerList } = Layer;
  const screen = Screen.instance;

  screen.setScreenSize(getMaxDimensions(displayElement));
  screen.renderLayers(layerList);
});

/**
 * Set's application's initial state
 */
function setInitialState() {
  // Color setup
  createColor("#ff0000", colorInputElement);
  createColor("#00ff00", colorInputElement);
  createColor("#0000ff", colorInputElement);

  // Tool setup
  loadTools();

  // Layer setup
  createLayerElement.click();
  createLayerElement.click();
  createLayerElement.click();
}

/**
 * Loads all tools
 */
function loadTools() {
  createPen();
  createEraser();
}

// Source code
main();
setInitialState();
