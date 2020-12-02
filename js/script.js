import Application from './models/Aplication.js';

function main() {
  const app = new Application();

  app.setupLayers();
  app.setupTools();
}

main();