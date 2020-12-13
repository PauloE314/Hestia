/**
 * Color's abstraction
 */
export default class Color {
  /**
   * Color value
   * @type {string}
   */
  value = "#ffffff";

  /**
   * Color list
   * @type {Array<Color>}
   */
  static colorList = [];

  /**
   * Element that contains the color's html element
   * @type {HTMLUListElement}
   */
  static colorListElement = document.getElementById("color-list");

  /**
   * Current selected color
   * @type {Color}
   */
  static currentColor = null;

  /**
   * @param {number} color Hex color
   * @param {HTMLInputElement} inputElement
   */
  constructor(color, inputElement) {
    this.element = document.createElement("li");
    this.element.classList.add("color");
    this.setColor(color);

    this.element.onclick = () => this.selectColor();

    this.element.ondblclick = () => {
      inputElement.value = this.value;
      inputElement.click();

      inputElement.oninput = () => this.setColor(inputElement.value);
    };

    if (Color.colorList.length == 0) this.selectColor();

    Color.colorList.push(this);
    Color.colorListElement.appendChild(this.element);
  }

  /**
   * Handles element double click
   */
  onDoubleClick() {}

  /**
   * Sets element's color
   * @param {string} color Hex color
   */
  setColor(color) {
    this.value = color;
    this.element.style.backgroundColor = color;
    this.element.title = color;
  }

  /**
   * Selects element
   */
  selectColor() {
    Color.colorList.forEach((color) =>
      color.element.classList.remove("selected")
    );
    Color.currentColor = this;
    this.element.classList.add("selected");
  }

  /**
   * Remove current color
   */
  removeColor() {
    const index = Color.colorList.indexOf(this);
    const next = Color.colorList[index + 1] || Color.colorList[index - 1];

    Color.colorListElement.removeChild(this.element);
    Color.colorList = Color.colorList.filter((color) => color !== this);

    if (next) {
      next.selectColor();
      return;
    }
    Color.currentColor = null;
  }

  /**
   * Deletes all colors
   */
  static removeAll() {
    Color.currentColor = null;
    Color.colorList.forEach((color) => color.removeColor());
  }

  /**
   * Loads new colors
   * @param {string[]} colorList
   * @param {HTMLInputElement} inputElement
   */
  static loadColors(colorList, inputElement) {
    colorList.forEach((color) => createColor(color, inputElement));
  }
}

/**
 * Creates a new Color
 * @param {string} color
 * @param {HTMLInputElement} colorInput
 */
export function createColor(color, colorInput) {
  return new Color(color, colorInput);
}

/**
 * Removes a color
 * @param {Color} color
 */
export function removeColor(color) {
  color.removeColor();
}
