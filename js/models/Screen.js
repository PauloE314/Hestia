import { createOne } from "../utils/index.js";
import Layer from "./Layer.js";

/**
 * Canvas screen abstraction
 */
class Screen {
  /**
   * Canvas element
   * @type {HTMLCanvasElement}
   */
  canvas = null;

  /**
   * Canvas's context
   * @type {CanvasRenderingContext2D}
   */
  ctx = null;

  /**
   * Is mouse pressed or not
   * @type {Boolean}
   */
  isMouseDown = false;

  /**
   * Screen instance
   * @type {Screen}
   */
  instance = null;

  /**
   *
   * @param {number} size
   * @param {HTMLCanvasElement} canvas
   */
  constructor(size, canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.setScreenSize(size);
  }

  /**
   * Renders new state on screen
   * @param {Array<Layer>} layerList
   */
  renderLayers(layerList) {
    const pixelSize = this.getPixelSize();

    for (const layer of layerList) {
      for (const pixel of layer.grid) {
        const { x, y } = pixel;
        const { r, g, b } = pixel.color.value;

        this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        this.ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  /**
   * Clears canvas rect
   */
  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Sets canvas size
   * @param {number} size
   */
  setScreenSize(size) {
    this.canvas.width = size;
    this.canvas.height = size;
  }

  /**
   * Returns current pixel size
   * @returns {number}
   */
  getPixelSize() {
    return Math.round(this.canvas.width / 32);
  }

  /**
   * Returns the grid position of a place on screen
   * @param {number} x
   * @param {number} y
   */
  getGridPositionOnScreen(x, y) {
    const canvasPosition = this.canvas.getBoundingClientRect();
    const pixelSize = this.getPixelSize();

    const newX = Math.floor((x - canvasPosition.x) / pixelSize);
    const newY = Math.floor((y - canvasPosition.y) / pixelSize);

    return {
      x: newX,
      y: newY,
    };
  }
}

/**
 * Gets screen's max dimensions based on container size
 * @param {HTMLElement} parent
 */
export function getMaxDimensions(parent) {
  const { width, height } = parent.getBoundingClientRect();
  const smallest = Math.min(width, height);

  return Math.max(smallest - 3 * 16, 0);
}

/**
 * Creates only one screen
 *
 * @param {number} size
 * @param {HTMLCanvasElement} canvas
 */
export function createScreen(size, canvas) {
  return createOne(Screen, size, canvas);
}
