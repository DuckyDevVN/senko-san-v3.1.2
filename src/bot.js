const { Client, Intents, Collection } = require("discord.js");
const { connect } = require("mongoose");
const chalk = require("chalk");
const fs = require("fs");
const process = require('process')
const config = require('./config')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
client.aliases = new Collection();
client.commands = new Collection();
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
client.handlerCommands();
client.handlerEvents();

client.login(config.token);