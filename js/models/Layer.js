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
   * @type {Array<{ x: number, y: number, color: string }>}
   */
  grid = null;

  /**
   * Sets layer to visible or not
   * @type {bool}
   */
  isVisible = true;

  /**
   * Layer's visible label
   * @type {string}
   */
  label = "";

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
    Layer.layerCount++;
    Layer.layerList.push(this);

    this.label = label;
    this.element = document.createElement("li");
    this.element.draggable = true;
    this.grid = [];

    const buttonElement = document.createElement("button");
    buttonElement.innerHTML = `<i class="far fa-eye .icon"></i>`;
    buttonElement.onclick = () => this.toggleVisibility();

    // Label change
    const labelElement = document.createElement("span");
    labelElement.innerHTML = label;
    labelElement.contentEditable = true;
    labelElement.oninput = () => (this.label = labelElement.innerHTML);

    this.element.appendChild(labelElement);
    this.element.appendChild(buttonElement);

    // Element click
    this.element.onclick = (e) => this.selectLayer(e);
    this.selectLayer();

    // Drag logic
    this.element.ondragover = (e) => e.preventDefault();
    this.element.ondragstart = (e) => {
      const position = Layer.layerList.indexOf(this);
      e.dataTransfer.setData("layerId", position);
    };
    this.element.ondrop = (e) => {
      e.preventDefault();
      const sourceIndex = Number(e.dataTransfer.getData("layerId"));
      const targetIndex = Layer.layerList.indexOf(this);

      this.onDrag(sourceIndex, targetIndex);
    };

    Layer.layerListElement.appendChild(this.element);
  }

  /**
   * Handles visibility
   */
  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.element.style.opacity = this.isVisible ? 1 : 0.5;
    this.onToggle();
  }

  /**
   * Toggle callback
   */
  onToggle() {}

  /**
   * Drag callback
   * @param {number} sourceIndex
   * @param {number} targetIndex
   */
  onDrag(sourceIndex, targetIndex) {}

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
    const { layerList, layerListElement } = Layer;

    const index = layerList.indexOf(this);
    const newLayer = layerList[index - 1 < 0 ? 0 : index - 1];

    layerListElement.removeChild(this.element);
    Layer.layerList = layerList.filter((layer) => layer !== this);

    // Selects current layer
    if (newLayer) {
      newLayer.selectLayer();
    }
  }

  /**
   * Set a pixel the layer
   * @param {number} x X position
   * @param {number} y Y position
   * @param {string} color Hex color
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

  /**
   * Render's layer list
   */
  static renderLayerList() {
    const { layerListElement, layerList } = Layer;

    layerListElement.innerHTML = "";
    layerList.forEach((layer) => {
      layerListElement.appendChild(layer.element);
    });
  }

  /**
   * Deletes all Layers
   */
  static removeAll() {
    Layer.currentLayer = null;
    Layer.layerList.forEach((layer) => layer.removeLayer());
  }

  /**
   * Loads layer list
   * @param {Array} layerList
   */
  static loadLayers(layerList) {
    layerList.forEach(({ label, isVisible, grid }) => {
      // Creates layer
      const layer = new Layer(label);

      // Sets pixels
      grid.forEach(({ x, y, color }) => layer.setPixel(x, y, color));

      // Set opacity
      if (!isVisible) layer.toggleVisibility();

      // Renders
      Layer.renderLayerList();
    });
  }
}

/**
 * Creates a new layer
 */
export function createLayer() {
  return new Layer(`Camada ${Layer.layerCount}`);
}

/**
 * Removes a layer
 * @param {Layer} layer
 */
export function removeLayer(layer) {
  layer.removeLayer();
}
