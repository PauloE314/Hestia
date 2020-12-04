import StateManager from './models/StateManger.js';
import Screen from './models/Screen.js';
import Color, { createColor } from './models/Color.js';
import Layer, { createLayer } from './models/Layer.js';

const createLayerElement = document.getElementById('create-layer');
const removeLayerElement = document.getElementById('remove-layer');
const createColorElement = document.getElementById('create-color');
const removeColorElement = document.getElementById('remove-color');
const redoElement = document.getElementById('redo');
const undoElement = document.getElementById('undo');
const saveElement = document.getElementById('save');
const canvasElement = document.querySelector('canvas');

/**
 * Application's main function
 */
function main() {
  const screen = new Screen();
  const stateManager = new StateManager();
  
  // Layer logic
  createLayerElement.onclick = () => createLayer();
  removeLayerElement.onclick = () => Layer.currentLayer.removeLayer();

  // Color logic
  createColorElement.onclick = () => createColor();
  removeColorElement.onclick = () => Color.currentColor.removeColor();

  // State logic
  redoElement.onclick = () => {};
  undoElement.onclick = () => {};

  // Save logic
  saveElement.onclick = () => {};

  // Draw logic
  canvasElement.onclick = () => {};


  // Click test
  // Screen.current.canvas.onclick = (e) => {
  //   const { x, y } = Screen.current.getGridPositionOnScreen(e.clientX, e.clientY);

  //   Layer.currentLayer.grid.setPixel(x, y, Color.currentColor);

  //   Application.updateState();
  //   Screen.current.render(Application.getState().layerList);
  // }
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

// Source code
main();
setInitialState();