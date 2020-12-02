import Layer from "./Layer.js";
import Tool from "./Tool.js";

/**
 * Application's abstraction
 */
export default class Aplication {
  stateList = [];
  currentSstate = {
    grid: null,
    color: null,
    tool: null,
    layers: null,
  };

  /**
   * Sets up layer's events
   */
  setupLayers() {
    const newLayer = document.getElementById('new-layer');
    const deleteLayer = document.getElementById('remove-layer');

    newLayer.onclick = () => new Layer(`Camada ${Layer.layerCount}`);
    deleteLayer.onclick = () => Layer.removeCurrentLayer();
  }

  /**
   * Sets up tools
   */
  setupTools() {
    const pen = new Tool();
    const eraser = new Tool();

    pen.element = document.getElementById('pen');
    eraser.element = document.getElementById('eraser');

    pen.element.onclick = () => pen.selectTool();
    eraser.element.onclick = () => eraser.selectTool();
  }

  /**
   * Sets a new state
   */
  setState(state) {
    this.stateList.push(this.currentSstate);
    this.currentSstate = state;
  }
}