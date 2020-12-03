import Color from "./Color.js";
import Layer from "./Layer.js";
import Tool from "./Tool.js";
import Screen from './Screen.js';

/**
 * Application's abstraction
 */
export default class Aplication {
  
  /**
   * @type {Array<{color: Color, layers: Array<Layer>}>}
   */
  static stateList = [{ color: null, layers: [] }];
  static stateIndex = 0;

  static backElement = document.getElementById('undo');
  static redoElement = document.getElementById('red');

  /**
   * Sets up layer's events
   */
  static setupLayers() {
    const newLayer = document.getElementById('new-layer');
    const deleteLayer = document.getElementById('remove-layer');

    newLayer.onclick = () => new Layer(`Camada ${Layer.layerCount}`);
    deleteLayer.onclick = () => Layer.removeCurrentLayer();

    if (Layer.layerList == 0) {
      new Layer("Camada 1");
    }
  }

  /**
   * Sets up tools
   */
  static setupTools() {
    const pen = new Tool();
    const eraser = new Tool();

    pen.element = document.getElementById('pen');
    eraser.element = document.getElementById('eraser');

    pen.element.onclick = () => pen.selectTool();
    eraser.element.onclick = () => eraser.selectTool();
  }

  /**
   * Sets up colors
   */
  static setupColors() {
    new Color(255, 0, 0);
    new Color(0, 255, 0);
    new Color(0, 0, 255);
  }

  /**
   * Sets up screen
   */
  static setupScreen() {
    new Screen();
  }

  /**
   * Gets current state
   */
  static getState() {
    return this.stateList[this.stateIndex];
  }

  /**
   * Sets a new state
   */
  static updateState() {
    const state = {
      color: Color.currentColor,
      layerList: Layer.layerList.map(e => e)
    };

    this.stateList.push(state);

    // Handles overflow
    if (this.stateList.length > 5) {
      this.stateList.shift();
    }

    this.stateIndex = this.stateList.length - 1;

    console.log(this.stateList, this.stateIndex)
  }

  /**
   * Back state
   * @returns {Array<{color: Color, layers: Array<Layer>}}
   */
  static backState() {
    this.stateIndex--;

    return this.getState();
  }
}
