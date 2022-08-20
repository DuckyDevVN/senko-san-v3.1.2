const chalk = require("chalk");
const cron = require("node-cron");
const { v4: uuidv4 } = require("uuid");
const timeUser = require("../../Schemas/thoigian");
const { MessageEmbed } = require("discord.js");
uuidv4();
module.exports = {
  name: "ready",
  async execute(client) {
    cron.schedule(
      "0 0 1 * * *",
      () => {
        timeUser.deleteMany();
        console.log(chalk.cyan(`[RESET STATUT]: reset in ${Date.now()}`));
      },
      {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh",
      }
    );
  },
};
