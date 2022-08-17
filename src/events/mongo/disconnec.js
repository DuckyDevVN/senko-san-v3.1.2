const chalk = require("chalk");

module.exports = {
  name: 'disconnec',
  async execute() {
    await console.log(chalk.red(`[MONGO STATUS]: Disconnec!!!`))
  }
}