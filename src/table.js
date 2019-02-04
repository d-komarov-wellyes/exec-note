const blessed = require('blessed');


module.exports = () => {
  const table = blessed.listtable({
    width: '100%',
    height: '100%',
    border: {
      type: 'line',
    },
    keys: true,
    style: {
      header: {
        bg: '#708090',
      },
      cell: {
        bg: '#708090',
      },
      bg: '#708090',
    },
  });

  return table;
};
