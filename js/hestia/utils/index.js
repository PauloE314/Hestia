import Color from "../models/Color.js";
import Screen from "../models/Screen.js";
import Layer from "../models/Layer.js";

/**
 * Creates only one instance
 * @param {FunctionConstructor} _class
 * @param  {...any} props
 */
export function createOne(_class, ...props) {
  if (!_class.instance) {
    _class.instance = new _class(...props);
  }
  return _class.instance;
}

/**
 * Renders screen based on state
 * @param {*} state - A base state
 * @param {Screen} screen
 */
export function renderChanges(state, screen) {
  const { layers } = state;

  // Renders layers
  Layer.removeAll();
  Layer.loadLayers(layers);
  screen.renderLayers(Layer.layerList);
}

/**
 * Renders screen based on state, but until colors
 * @param {*} state - A base state
 * @param {Screen} screen
 * @param {HTMLInputElement} inputElement
 */
export function renderState(state, screen, inputElement) {
  const { colors, layers, currentColor, currentLayer } = state;

  // Renders colors
  Color.removeAll();
  Color.loadColors(colors, inputElement);
  Color.colorList[currentColor || 0].selectColor();

  // Renders layers
  Layer.removeAll();
  Layer.loadLayers(layers);
  Layer.layerList[currentLayer || 0].selectLayer();
  screen.renderLayers(Layer.layerList);
}

/**
 *
 * @param {HTMLElement} undo
 * @param {HTMLElement} redo
 * @param {} stateManager
 */
export function setStateButtons(undo, redo, stateManager) {
  undo.disabled = stateManager.stateIndex == 0;
  redo.disabled = stateManager.stateIndex == stateManager.stateList.length - 1;
}
