const blessed = require('blessed');

module.exports = () => {
  const form = blessed.form({
    keys: true,
    left: 0,
    top: 0,
    width: 100,
    height: 20,
    bg: 'blue',
  });

  blessed.textbox({
    parent: form,
    keys: true,
    shrink: true,
    width: 98,
    inputOnFocus: true,
    padding: {
      left: 1,
      right: 1,
    },
    left: 1,
    top: 3,

  });

  blessed.textbox({
    parent: form,
    keys: true,
    shrink: true,
    width: 98,
    inputOnFocus: true,
    padding: {
      left: 1,
      right: 1,
    },
    left: 1,
    top: 6,
  });

  blessed.box({
    parent: form,
    shrink: true,
    padding: {
      left: 1,
      right: 1,
    },
    left: 1,
    top: 2,
    content: 'Name',
  });

  blessed.box({
    parent: form,
    shrink: true,
    padding: {
      left: 1,
      right: 1,
    },
    left: 1,
    top: 5,
    content: 'Content',
  });

  return form;
};
