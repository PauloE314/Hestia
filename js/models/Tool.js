/**
 * Base tool abstraction
 */
export default class Tool {
  element = null;
  action = () => {};

  static toolList = [];
  static toolListElement = null;
  static currentTool = null;
  
  constructor() {
    Tool.toolList.push(this);
  }

  /**
   * Selects a new tool
   */
  selectTool() {
    if (this.element) {
      Tool.toolList.forEach(tool => tool.element.classList.remove('selected'));
      Tool.currentTool = this;
      this.element.classList.add('selected');
    }
  }
}