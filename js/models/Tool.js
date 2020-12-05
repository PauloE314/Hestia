import Color from "./Color.js";
import Layer from "./Layer.js";

/**
 * Base tool abstraction
 */
export default class Tool {
  /**
   * @type {HTMLLIElement}
   */
  element = null;

  /**
   * @type {Tool}
   */
  static currentTool = null;

  /**
   * @type {Array<Tool>}
   */
  static toolList = [];

  /**
   * Creates a new base tool
   * @param {string} name
   * @param {HTMLElement} element
   */
  constructor(name, element) {
    this.element = element;
    this.element.title = name;
    this.element.onclick = () => this.selectTool();

    if (Tool.toolList.length == 0) this.selectTool();

    Tool.toolList.push(this);
  }

  /**
   * Selects a new tool
   */
  selectTool() {
    if (this.element) {
      Tool.toolList.forEach((tool) =>
        tool.element.classList.remove("selected")
      );
      Tool.currentTool = this;
      this.element.classList.add("selected");
    }
  }

  /**
   * Tool's main action
   *
   * @param {MouseEvent} event
   * @param {Object} options
   */
  action(event, options) {}
}
