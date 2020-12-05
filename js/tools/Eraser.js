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
  action(event, options) {
    const { layer, x, y } = options;

    console.log(layer.grid.find((pixel) => pixel.x == x && pixel.y == y));
    layer.removePixel(x, y);
  }
}

/**
 * Creates only one eraser
 */
export function createEraser() {
  return createOne(Eraser);
}
