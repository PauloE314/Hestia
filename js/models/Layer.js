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
   * @type {LayerGrid}
   */
  grid = null;

  /**
   * Sets layer to visible or not
   * @type {bool}
   */
  isVisible = true;

  /**
   * Created laye count helper
   * @type {umber}
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
  static layerListElement = document.getElementById('layer-list');

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
    this.element = document.createElement('li');
    this.grid = new LayerGrid();

    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = `<i class="far fa-eye .icon"></i>`;
    buttonElement.onclick = () => this.toggleVisibility();

    // Label change
    const labelElement = document.createElement('span');
    labelElement.innerHTML = label;
    labelElement.contentEditable = true;

    this.element.appendChild(labelElement);
    this.element.appendChild(buttonElement);
    
    // Element click
    this.element.onclick = (e) => this.selectLayer(e);

    // Handles no layer
    if (Layer.layerList.length == 0)  this.selectLayer();

    Layer.layerCount++;
    Layer.layerList.push(this);
    Layer.layerListElement.appendChild(this.element);
  }

  /**
   * Handle layer click
   */
  selectLayer(e) {
    if (!e || e.target == this.element) {
      // Removes previous selected
      Layer.layerList.forEach(layer => {
        layer.element.classList.remove('selected')
      });
  
      // Sets new current layer and style
      Layer.currentLayer = this;
      this.element.classList.add('selected');
    }
  }

  /**
   * Handles visibility
   */
  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.element.style.opacity = this.isVisible ? 1 :  0.5;
  }

  /**
   * Deletes current layer
   */
  removeLayer() {
    if (Layer.currentLayer) {
      const index = Layer.layerList.indexOf(Layer.currentLayer);
      const newLayer = Layer.layerList[index - 1 < 0 ? 0 : index - 1];

      Layer.layerListElement.removeChild(Layer.currentLayer.element);
      Layer.layerList = Layer.layerList.filter(layer => layer != Layer.currentLayer);

      if (newLayer) {
        newLayer.selectLayer();
      }
    }
  }
}

/**
 * Grid abstraction
 * 
 */
class LayerGrid {
  /**
   * @type {Array<{x: number, y: number, color: Color}>}
   */
  pixelList = [];

  /**
   * Set a pixel in grid
   * @param {number} x X poisition
   * @param {number} y Y position
   * @param {Color} color Color (r, g, b)
   */
  setPixel(x, y, color) {
    for (const pixel of this.pixelList) {
      if (pixel.x == x && pixel.y == y) {
        pixel.color = color;
        return;
      }
    }
    this.pixelList.push({ x, y, color });
  }
}


/**
 * Creates a new layer
 * @param {string} label
 */
export function createLayer(label) {
  return new Layer(label);
}