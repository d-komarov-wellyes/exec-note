const envPaths = require('env-paths');
const fs = require('fs');
const path = require('path');

const paths = envPaths('exec-note');
if (!fs.existsSync(paths.config)) {
  fs.mkdirSync(paths.config, { recursive: true });
}
const dataFilePath = path.join(paths.config, 'commands.json');

function loadCommands() {
  if (fs.existsSync(dataFilePath)) {
    return JSON.parse(fs.readFileSync(dataFilePath).toString());
  }

  return [];
}

function getRows(commands = loadCommands()) {
  const rows = [
    ['Name', 'Command'],
  ];

  commands.forEach((commandObject) => {
    rows.push([
      commandObject.name,
      commandObject.command,
    ]);
  });

  return rows;
}

function addCommand(command) {
  const commands = loadCommands();

  const updatedCommands = [
    ...commands,
    command,
  ];

  fs.writeFileSync(dataFilePath, JSON.stringify(updatedCommands));

  return getRows(updatedCommands);
}

function removeCommand(removeIndex) {
  const commands = loadCommands();
  const updatedCommands = commands.filter((_, index) => index !== removeIndex);

  fs.writeFileSync(dataFilePath, JSON.stringify(updatedCommands));

  return getRows(updatedCommands);
}

module.exports = {
  loadCommands,
  getRows,
  addCommand,
  removeCommand,
};
