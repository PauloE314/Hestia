import Layer from "../models/Layer.js";
import Tool from "../models/Tool.js";
import { createOne } from "../utils/index.js";

class Eraser extends Tool {
  constructor() {
    super("Apagador", document.getElementById("eraser"));
    Eraser.instance = this;
  }

  /**
   * Erases pixel
   *
   * @param {MouseEvent} event
   * @param {{ layer: Layer, x: number, y: number }} options
   */
  clickAction(event, options) {
    const { layer, x, y } = options;

    layer.removePixel(x, y);
  }

  /**
   * Erases pixels
   *
   * @param {MouseEvent} event
   * @param {object} options
   */
  holdAction(event, options) {
    this.clickAction(event, options);
  }
}

/**
 * Creates only one eraser
 */
export function createEraser() {
  return createOne(Eraser);
}
