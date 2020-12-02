
// Tools
export default class Tool {
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

export function setupTools() {
  document.querySelectorAll('.tool').forEach(tool => {
    new Tool(tool);
  });
}
