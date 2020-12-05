import Color from "./Color.js";

/**
 * Layer's abstraction
 */
export default class Layer {
  /**
   * Layer's html element
   * @type {HTMLLIElement}
   */
  element = null;

  /**
   * Grid's class element
   * @type {Array<{ x: number, y: number, color: Color }>}
   */
  grid = null;

  /**
   * Sets layer to visible or not
   * @type {bool}
   */
  isVisible = true;

  /**
   * Created layer count helper
   * @type {number}
   */
  static layerCount = 0;

  /**
   * Layer list of element
   * @type {Array<Layer>}
   */
  static layerList = [];

  /**
   * Element in which the layers controller are rendered
   * @type {HTMLUListElement}
   */
  static layerListElement = document.getElementById("layer-list");

  /**
   * Current selected layer
   * @type {Layer}
   */
  static currentLayer = null;

  /**
   * Creates a new layer in application
   * @param {string} label Layer's label
   */
  constructor(label) {
    this.element = document.createElement("li");
    this.grid = [];

    const buttonElement = document.createElement("button");
    buttonElement.innerHTML = `<i class="far fa-eye .icon"></i>`;
    buttonElement.onclick = () => this.toggleVisibility();

    // Label change
    const labelElement = document.createElement("span");
    labelElement.innerHTML = label;
    labelElement.contentEditable = true;

    this.element.appendChild(labelElement);
    this.element.appendChild(buttonElement);

    // Element click
    this.element.onclick = (e) => this.selectLayer(e);

    // Handles no layer
    if (Layer.layerList.length == 0) this.selectLayer();

    Layer.layerCount++;
    Layer.layerList.push(this);
    Layer.layerListElement.appendChild(this.element);
  }

  /**
   * Handles visibility
   */
  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.element.style.opacity = this.isVisible ? 1 : 0.5;
  }

  /**
   * Handle layer click
   */
  selectLayer(e) {
    if (!e || e.target == this.element) {
      // Removes previous selected
      Layer.layerList.forEach((layer) => {
        layer.element.classList.remove("selected");
      });

      // Sets new current layer and style
      Layer.currentLayer = this;
      this.element.classList.add("selected");
    }
  }

  /**
   * Deletes current layer
   */
  removeLayer() {
    if (Layer.currentLayer) {
      const index = Layer.layerList.indexOf(Layer.currentLayer);
      const newLayer = Layer.layerList[index - 1 < 0 ? 0 : index - 1];

      Layer.layerListElement.removeChild(Layer.currentLayer.element);
      Layer.layerList = Layer.layerList.filter(
        (layer) => layer != Layer.currentLayer
      );

      // Selects current layer
      if (newLayer) {
        newLayer.selectLayer();
      }
    }
  }

  /**
   * Set a pixel the layer
   * @param {number} x X position
   * @param {number} y Y position
   * @param {Color} color Color (r, g, b)
   */
  setPixel(x, y, color) {
    for (let i = 0; i < this.grid.length; i++) {
      const pixel = this.grid[i];

      if (pixel.x == x && pixel.y == y) {
        pixel.color = color;
        return;
      }
    }
    this.grid.push({ x, y, color });
  }

  /**
   * Removes a pixel from grid
   * @param {number} x
   * @param {number} y
   */
  removePixel(x, y) {
    for (let i = 0; i < this.grid.length; i++) {
      const pixel = this.grid[i];

      if (pixel.x == x && pixel.y == y) {
        this.grid.splice(i, 1);
        return;
      }
    }
  }
}

/**
 * Creates a new layer
 * @param {string} label
 */
export function createLayer(label) {
  if (!label) {
    label = `Camada ${Layer.layerCount}`;
  }
  return new Layer(label);
}
