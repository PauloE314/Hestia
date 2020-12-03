import Application from './models/Aplication.js';
import Color from './models/Color.js';
import Layer from './models/Layer.js';
import Screen from './models/Screen.js';


function main() {
  Application.setupLayers();
  Application.setupTools();
  Application.setupColors();
  Application.setupScreen();

  // Click test
  Screen.current.canvas.onclick = (e) => {
    const { x, y } = Screen.current.getGridPositionOnScreen(e.clientX, e.clientY);

    Layer.currentLayer.grid.setPixel(x, y, Color.currentColor);

    Application.updateState();
    Screen.current.render(Application.getState().layerList);
  }

  // Back test
  Application.backElement.onclick = () => {
    Application.backState();
    console.log(Application.getState(), Application.stateIndex);
    Screen.current.render(Application.getState().layerList);
  }
}

main();