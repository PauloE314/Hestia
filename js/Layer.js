
export default class Layer {
  element = null;
  isVisible = true;

  static layerCount = 0;

  constructor(label) {
    this.element = document.createElement('li');

    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = `<i class="far fa-eye .icon"></i>`;
    buttonElement.onclick = () => {
      this.isVisible = !this.isVisible;
      this.element.style.opacity = this.isVisible ? 1 :  0.5;
    }

    // Label change
    const labelElement = document.createElement('span');
    labelElement.innerHTML = label;
    labelElement.contentEditable = true;

    this.element.appendChild(labelElement);
    this.element.appendChild(buttonElement);
    
    // Element click
    this.element.onclick = (e) => {
      if (e.target === this.element) {
        layerList.forEach(layer => layer.element.classList.remove('selected'));
        currentLayer = this;
        this.element.classList.add('selected');
      }
    }

    if (layerList.length == 0) {
      currentLayer = this;
      this.element.classList.add('selected');
    }

    Layer.layerCount++;
    layerList.push(this);
    layerListElement.appendChild(this.element);
  }
}

export function setupLayer() {
  new Layer('Primeira Layer');
  new Layer('Segunda Layer');
}