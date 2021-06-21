import { createOne } from "../utils/index.js";
import Color from "./Color.js";
import Layer from "./Layer.js";
import Screen from "./Screen.js";

/**
 * State's abstraction
 */
class StateManager {
  /**
   * @typedef {{layers: {label: string, isVisible: boolean, grid: {x: number, y: number, color: string}[] }[], currentLayer: number, colors: Array<string>, currentColor: number} State
   */

  /**
   * @type {State[]}
   */
  stateList = [];

  /**
   * State index
   * @type {number}
   */
  stateIndex = 0;

  /**
   * @param {Screen} screen
   * @param {string} imageName
   */
  generateImage(screen, imageName) {
    const { canvas } = screen;

    const anchor = document.createElement("a");
    const image = canvas.toDataURL("image/png");

    anchor.download = imageName + ".png";
    anchor.href = image;
    anchor.click();
  }

  /**
   * Generates a new state
   * @param {Array<Layer>} layerList
   * @param {Array<Color>} colorList
   * @param {Layer} currentLayer
   * @param {Color} currentColor
   */
  update(layerList, colorList, currentLayer, currentColor) {
    const currentLayerId = layerList.indexOf(currentLayer);
    const currentColorId = colorList.indexOf(currentColor);

    const currentState = {
      layers: layerList.map((layer) => ({
        label: layer.label,
        isVisible: layer.isVisible,
        grid: layer.grid.map((pixel) => ({
          x: pixel.x,
          y: pixel.y,
          color: pixel.color,
        })),
      })),
      colors: colorList.map((color) => color.value),
      currentLayer: currentLayerId,
      currentColor: currentColorId,
    };

    this.stateList.push(currentState);

    if (this.stateList.length > 5) {
      this.stateList.shift();
    }

    return this.forwardState();
  }

  /**
   * Return's the current state
   */
  getCurrentState() {
    return this.stateList[this.stateIndex];
  }

  /**
   * Backs one state
   */
  backState() {
    this.stateIndex = Math.max(0, this.stateIndex - 1);

    return this.getCurrentState();
  }

  /**
   * Advances one state
   */
  forwardState() {
    this.stateIndex = Math.min(this.stateList.length - 1, this.stateIndex + 1);

    return this.getCurrentState();
  }
}

/**
 * Creates only one state manager
 * @returns {StateManager}
 */
export function createStateManager() {
  return createOne(StateManager);
}
