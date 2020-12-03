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

  /**
   * Screen singleton instance
   * @type {Screen}
   */
  static current = null;

  constructor() {
    if (!Screen.current) {
      const { width, height } = document.getElementById('display').getBoundingClientRect();

      Screen.current = this;
      Screen.current.canvas = document.querySelector('canvas');
      Screen.current.setScreenSize(width, height);
      Screen.current.ctx = this.canvas.getContext('2d');
  
      return this;
    }
    return Screen.current;
  }

  /**
   * Renders new state on screen
   * @param {Array<Layer>} layerList
   */
  render(layerList) {
    // Clear
    const screenWidth = Screen.current.canvas.width;
    const screenHeight = Screen.current.canvas.height;
    Screen.current.ctx.clearRect(0, 0, screenWidth, screenHeight);

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
    Screen.current.canvas.width = width;
    Screen.current.canvas.height = height;
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