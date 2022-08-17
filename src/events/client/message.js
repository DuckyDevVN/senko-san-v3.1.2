const config = require("../../config");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    const command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) {
      await command.execute(client, message, args);
    }
  },
};
