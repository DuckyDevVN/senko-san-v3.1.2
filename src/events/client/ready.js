const chalk = require("chalk")

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(chalk.cyan(`[CLIENT STATUT]: ${client.user.tag}`))
  }
}