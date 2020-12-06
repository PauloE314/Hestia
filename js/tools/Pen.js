import Color from "../models/Color.js";
import Tool from "../models/Tool.js";
import { createOne } from "../utils/index.js";

class Pen extends Tool {
  constructor() {
    super("Caneta", document.getElementById("pen"));
    Pen.instance = this;
  }

  /**
   * Draws a pixel
   *
   * @param {MouseEvent} event
   * @param {{ layer: Layer, color: Color, x: number, y: number }} options
   */
  clickAction(event, options) {
    const { layer, color, x, y } = options;

    if (color) {
      layer.setPixel(x, y, color.value);
    }
  }

  /**
   * Draws a pixel
   *
   * @param {MouseEvent} event
   * @param {object} options
   */
  holdAction(event, options) {
    this.clickAction(event, options);
  }
}

/**
 * Creates only one pen
 */
export function createPen() {
  return createOne(Pen);
}
