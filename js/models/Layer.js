/**
 * Layer's abstraction
 */
export default class Layer {
  element = null;
  isVisible = true;

  static layerCount = 0;
  static layerList = [];
  static layerListElement = document.getElementById('layer-list');
  static currentLayer = null;

  /**
   * Creates a new layer in application
   * @param {string} label Layer's label
   */
  constructor(label) {
    this.element = document.createElement('li');

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
    if (Layer.layerList.length == 0) {
      this.selectLayer();
    }

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
  static removeCurrentLayer() {
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