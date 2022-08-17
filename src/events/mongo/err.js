const chalk = require('chalk');

module.exports = {
  name: 'err',
  async execute(err) {
    await console.log(chalk.red(`[MONGO ERROR]: ${err}`))
  }
}