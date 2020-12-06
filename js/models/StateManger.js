import { createOne } from "../utils/index.js";
import Screen from "./Screen.js";

/**
 * State's abstraction
 */
class StateManager {
  /**
   * @param {Screen} screen
   * @param {string} imageName
   */
  generateImage(screen, imageName) {
    const { canvas } = screen;

    const anchor = document.createElement("a");
    const image = canvas.toDataURL("image/jpeg");

    console.log(imageName);
    anchor.download = imageName + ".jpeg";
    anchor.href = image;
    anchor.click();
  }
}

/**
 * Creates only one state manager
 * @returns {StateManager}
 */
export function createStateManager() {
  return createOne(StateManager);
}
