
export default class Color {
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

export function setupColors() {
  new Color(255, 0, 0);
  new Color(0, 255, 0);
  new Color(0, 0, 255);
}
