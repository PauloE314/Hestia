import { createOne } from "../utils/index.js";
import Color from "./Color.js";
import Layer from "./Layer.js";
import Screen from "./Screen.js";

/**
 * State's abstraction
 */
class StateManager {
  /**
   * @typedef {{label: string, isVisible: boolean, grid: Array<{x: number, y: number, color: string}} State
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
    const image = canvas.toDataURL("image/jpeg");

    anchor.download = imageName + ".jpeg";
    anchor.href = image;
    anchor.click();
  }

  /**
   * Generates a new state
   * @param {Array<Layer>} layerList
   * @param {Array<Color>} colorList
   */
  updateStateList(layerList, colorList) {
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
    };

    this.stateList.push(currentState);

    if (this.stateList.length > 5) {
      this.stateList.shift();
    }

    return this.stateList;
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
  }

  /**
   * Advances one state
   */
  forwardState() {
    this.stateIndex = Math.min(this.stateList.length - 1, this.stateIndex + 1);
  }
}

/**
 * Creates only one state manager
 * @returns {StateManager}
 */
export function createStateManager() {
  return createOne(StateManager);
}

const stateExample = {
  layers: [
    {
      label: "Label",
      isVisible: true,
      grid: [
        { x: 0, y: 0, color: "#ff0000" },
        { x: 1, y: 0, color: "#00ff00" },
        { x: 2, y: 0, color: "#0000ff" },
      ],
    },
  ],
  colors: ["#ff0000"],
};
