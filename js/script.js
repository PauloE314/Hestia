const layerListElement = document.getElementById('layer-list');
const toolListElemet = document.getElementById('tool-list');
const colorLisElemet = document.getElementById('color-list');

var currentTool = null;
var currentLayer = null;
var currentColor = null;
var layerList = [];
var toolList = [];
var colorList = [];

class Color {
  element = null;
  value = null;

  constructor(r, g, b) {
    this.element = document.createElement('li');
    this.element.classList.add('color');
    this.changeColor(r, g, b);

    this.element.onclick = () => {
      colorList.forEach(color => color.element.classList.remove('selected'));
      this.element.classList.add('selected');
      currentColor = this;
    }

    if (colorList.length == 0) {
      this.element.classList.add('selected');
      currentColor = this;
    }

    colorList.push(this);
    colorLisElemet.appendChild(this.element);
  }

  // Color
  changeColor(r, g, b) {
    const newColor = `rgb(${r}, ${g}, ${b})`;

    this.value = {r, g, b};
    this.element.style.backgroundColor = newColor;
    this.element.title = newColor;
  }
}

function setupColors() {
  new Color(255, 0, 0);
  new Color(0, 255, 0);
  new Color(0, 0, 255);
}


// Tools
class Tool {
  element = null;
  action = () => {};
  
  constructor(element) {
    toolList.push(this);

    this.element = element;
    this.element.onclick = () => {
      toolList.forEach(tool => tool.element.classList.remove('selected'));
      this.element.classList.add('selected');
      currentTool = this;
    }
  }
}

function setupTools() {
  document.querySelectorAll('.tool').forEach(tool => {
    new Tool(tool);
  });
}

class Layer {
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

function setupLayer() {
  new Layer('Primeira Layer');
  new Layer('Segunda Layer');
}

function setup() {
  setupColors();
  setupLayer();
  setupTools();
}


window.addEventListener('load', setup);

document.getElementById('new-layer').onclick = () => {
  new Layer(`Camada ${Layer.layerCount}`);
}

document.getElementById('remove-layer').onclick = () => {
  layerListElement.removeChild(currentLayer.element);
  layerList.splice(layerList.indexOf(currentLayer), 1);
  
  if (layerList.length !== 0) {
    layerList[0].element.classList.add('selected');
    currentLayer = layerList[0];
  }
  else {
    currentLayer = null;
  }
}