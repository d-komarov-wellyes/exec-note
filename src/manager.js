const { spawn } = require('child_process');
const screenC = require('./screen');
const tableC = require('./table');
const formC = require('./form');
const dataManager = require('./data');


class Manager {
  start() {
    this.rows = dataManager.getRows();
    this.screen = screenC();
    this.table = tableC();
    this.form = formC();
    this.screen.append(this.table);
    this.table.focus();
    this.table.setData(this.rows);

    this.setEvents();
    this.screen.render();
  }

  setEvents() {
    this.screen.key(['q', 'C-c'], () => process.exit(0));

    this.table.key(['a'], () => {
      this.screen.remove(this.table);
      this.screen.append(this.form);
      this.form.children[0].focus();
      this.screen.render();
    });

    this.table.on('select', (selected) => {
      this.table.destroy();
      this.screen.destroy();
      const command = this.rows[selected.index - 1][1];
      const child = spawn(command, { stdio: 'inherit', shell: true });

      child.on('close', () => {
        process.exit(0);
      });
    });

    this.form.key(['enter'], () => {
      const name = this.form.children[0].value;
      const command = this.form.children[1].value;
      if (name && command) {
        this.rows = dataManager.addCommand({
          name,
          command,
        });
        this.table.setData(this.rows);
        this.screen.remove(this.form);
        this.screen.append(this.table);
        this.table.focus();
        this.screen.render();
      }
    });

    this.form.key('escape', () => {
      this.screen.remove(this.form);
      this.screen.append(this.table);
      this.table.focus();
      this.screen.render();
    });
  }
}


module.exports = new Manager();
