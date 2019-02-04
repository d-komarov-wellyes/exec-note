const blessed = require('blessed');


module.exports = () => {
  const screen = blessed.screen({
    smartCSR: true,
  });

  screen.title = 'Exec note';
  return screen;
};
