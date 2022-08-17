const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  client.handlerCommands = async () => {
    fs.readdirSync("./src/commands").forEach((dir) => {
      const commands = fs
        .readdirSync(`./src/commands/${dir}/`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commands) {
        const pull = require(`../../commands/${dir}/${file}`);
        const { commands } = client;
        if (pull.name) {
          commands.set(`${pull.name}`, pull);
          console.log(chalk.cyan(`[COMMANDS]: ${pull.name} => Ready...`));
        } else {
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases))
          pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
    });
  };
};
