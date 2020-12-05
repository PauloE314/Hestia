import { createStateManager } from "./models/StateManger.js";
import { createScreen, getMaxDimensions } from "./models/Screen.js";
import Color, { createColor } from "./models/Color.js";
import Layer, { createLayer } from "./models/Layer.js";
import Tool from "./models/Tool.js";
import { createPen } from "./tools/Pen.js";
import { createEraser } from "./tools/Eraser.js";

const createLayerElement = document.getElementById("new-layer");
const removeLayerElement = document.getElementById("remove-layer");
const createColorElement = document.getElementById("new-color");
const removeColorElement = document.getElementById("remove-color");
const redoElement = document.getElementById("redo");
const undoElement = document.getElementById("undo");
const saveElement = document.getElementById("save");
const canvasElement = document.querySelector("canvas");
const displayElement = document.getElementById("display");

/**
 * Application's main function
 */
function main() {
  const screen = createScreen(getMaxDimensions(displayElement), canvasElement);
  const stateManager = createStateManager();

  // Loads all tools
  loadTools();

  // Layer logic
  createLayerElement.onclick = () => createLayer();
  removeLayerElement.onclick = () => {
    Layer.currentLayer.removeLayer();

    // Renders changes
    screen.clearScreen();
    screen.renderLayers(Layer.layerList);
  };

  // Color logic
  createColorElement.onclick = () => createColor(255, 255, 255);
  removeColorElement.onclick = () => Color.currentColor.removeColor();

  // State logic
  redoElement.onclick = () => {};
  undoElement.onclick = () => {};

  // Save logic
  saveElement.onclick = () => {};

  // Draw logic
  canvasElement.onclick = (e) => {
    const { x, y } = screen.getGridPositionOnScreen(e.clientX, e.clientY);
    const { currentTool } = Tool;
    const { currentColor } = Color;
    const { currentLayer, layerList } = Layer;

    // Tool action
    currentTool.action(e, {
      layer: currentLayer,
      color: currentColor,
      x,
      y,
      screen,
    });

    // Renders
    screen.clearScreen();
    screen.renderLayers(layerList);
  };

  // Handle resize
  window.addEventListener("resize", () => {
    const { layerList } = Layer;

    screen.setScreenSize(getMaxDimensions(displayElement));
    screen.renderLayers(layerList);
  });
}

/**
 * Set's application's initial state
 */
function setInitialState() {
  // Color setup
  createColor(250, 0, 0);
  createColor(0, 250, 0);
  createColor(0, 0, 250);

  // Layer setup
  createLayer("Camada 0");
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
