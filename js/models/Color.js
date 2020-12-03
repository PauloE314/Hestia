/**
 * Color's abstraction
 */
export default class Color {
  /**
   * Element in which user can control or select the color
   * @type {HTMLLIElement}
   */
  element = null;

  /**
   * Color value
   * @type {{ r: number, g: number, b: number }}
   */
  value = null;

  /**
   * Color list
   * @type {Array<Color>}
   */
  static colorList = [];

  /**
   * Element that contains the color's html element
   * @type {HTMLUListElement}
   */
  static colorLisElemet = document.getElementById('color-list');

  /**
   * Current selected color
   * @type {Color}
   */
  static currentColor = null;

  /**
   * @param {number} r red
   * @param {number} g green
   * @param {number} b blue
   */
  constructor(r, g, b) {
    this.element = document.createElement('li');
    this.element.classList.add('color');
    this.setColor(r, g, b);

    this.element.onclick = () => this.selectColor();

    if (Color.colorList.length == 0) this.selectColor();

    Color.colorList.push(this);
    Color.colorLisElemet.appendChild(this.element);
  }

  /**
   * Sets element's color
   * @param {number} r red
   * @param {number} g green
   * @param {number} b blue
   */
  setColor(r, g, b) {
    const newColor = `rgb(${r}, ${g}, ${b})`;

    this.value = {r, g, b};
    this.element.style.backgroundColor = newColor;
    this.element.title = newColor;
  }

  /**
   * Selects element
   */
  selectColor() {
    Color.colorList.forEach(color => color.element.classList.remove('selected'));
    Color.currentColor = this;
    this.element.classList.add("selected");
  }
  
}

