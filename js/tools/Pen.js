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
  action(event, options) {
    const { layer, color, x, y } = options;

    layer.setPixel(x, y, color);
  }
}

/**
 * Creates only one pen
 */
export function createPen() {
  return createOne(Pen);
}
