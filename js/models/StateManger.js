import { createOne } from "../utils/index.js";
import Color from "./Color.js";
import Layer from "./Layer.js";

/**
 * State's abstraction
 */
class StateManager {
  /**
   * @type {Array<{color: Color, layers: Array<Layer>}>}
   */
  static stateList = [{ color: null, layers: [] }];
  static stateIndex = 0;

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
      layerList: Layer.layerList.map((e) => e),
    };

    this.stateList.push(state);

    // Handles overflow
    if (this.stateList.length > 5) {
      this.stateList.shift();
    }

    this.stateIndex = this.stateList.length - 1;

    console.log(this.stateList, this.stateIndex);
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

/**
 * Creates only one state manager
 */
export function createStateManager() {
  return createOne(StateManager);
}
