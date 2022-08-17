const { Client, Intents, Collection } = require("discord.js");
const { connect, Schema, Promise } = require("mongoose");
const chalk = require("chalk");
const fs = require("fs");
const process = require('process')
const config = require('./config')
/*Client Intents*/
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
/*Client Collection*/
client.aliases = new Collection();
client.commands = new Collection();
/*Function Fs*/
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
/*Client handlers*/
client.handlerCommands();
client.handlerEvents();
/*Login client*/
client.login(config.token);
/*Connect MongoDB*/
(async () => {
  connect(`mongodb+srv://vitbuon2008:Anh345886%40gmail%2Ecom@senko-san.dsdtl9g.mongodb.net/Data`)
})();
/*Client mongodb coin*/
const moneyUser = require('./Schemas/money');
client.add = async(id, coins) => {
  moneyUser.findOne({ id }, async(err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = new Schema({ id, coins });
    }
    data.save()
  })
}
client.rmv = async(id, coins) => {
  moneyUser.findOne({ id }, async(err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = new Schema({ id, coins: -coins });
    }
    data.save()
  })
}
client.bal = (id) => new Promise(async ful => {
  const data = await moneyUser.findOne({ id });
  if (!data) return ful(0);
  ful(data.coins);
})