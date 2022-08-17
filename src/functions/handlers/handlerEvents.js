const fs = require("fs");
const chalk = require("chalk");
const { connection } = require('mongoose')
module.exports = (client) => {
  client.handlerEvents = async () => {
    const eventFolders = fs.readdirSync("./src/events");
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((f) => f.endsWith(".js"));

      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(client, ...args)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(client, ...args)
              );
            console.log(chalk.cyan(`[EVENTS]: ${event.name} => Ready...`));
          }
          break;

        case "mongo":
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              connection.once(event.name, (...args) =>
                event.execute(client, ...args)
              );
            else
              connection.on(event.name, (...args) =>
                event.execute(client, ...args)
              );
            console.log(chalk.cyan(`[EVENTS]: ${event.name} => Ready...`));
          }
          break;
        default:
          break;
      }
    }
  };
};
