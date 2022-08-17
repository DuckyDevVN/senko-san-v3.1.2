const chalk = require("chalk")

module.exports = {
  name: 'connecting',
  async execute() {
    await console.log(chalk.green(`[MONGO STATUTS]: Connecting...`))
  }   
}