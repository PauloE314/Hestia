import Layer from "./Layer.js";

/**
 * Canvas screen abstraction
 */
export default class Screen {
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


  constructor() {
    const { width, height } = document.getElementById('display').getBoundingClientRect();

    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.setScreenSize(width, height);
  }

  /**
   * Renders new state on screen
   * @param {Array<Layer>} layerList
   */
  renderLayers(layerList) {
    // Clear
    const screenWidth = this.canvas.width;
    const screenHeight = this.canvas.height;
    this.ctx.clearRect(0, 0, screenWidth, screenHeight);

    const pixelSize = this.getPixelSize();

    for (const layer of layerList) {
      for (const pixel of layer.grid.pixelList) {
        const { x, y } = pixel;
        const { r, g, b } = pixel.color.value; 

        this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        this.ctx.fillRect(
          x * pixelSize,
          y * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    }
  }

  /**
   * Sets canvas size
   * @param {number} width
   * @param {number} height
   */
  setScreenSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Returns current pixel size
   * @returns {number}
   */
  getPixelSize() {
    return 25;
  }

  /**
   * Returns the grid position of a place on screen
   * @param {number} x
   * @param {number} y
   */
  getGridPositionOnScreen(x, y) {
    const canvasPosition = this.canvas.getBoundingClientRect();
    const pixelSize = this.getPixelSize();

    const newX = Math.floor((x - canvasPosition.x)/pixelSize);
    const newY = Math.floor((y - canvasPosition.y)/pixelSize);

    return {
      x: newX,
      y: newY,
    }
  }
}