const chalk = require("chalk");
const cron = require("node-cron");
const { v4: uuidv4 } = require("uuid");
const timeUser = require("../../Schemas/thoigian");
const { MessageEmbed } = require("discord.js");
uuidv4();

module.exports = {
  name: "ready",
  async execute(client) {
    const embedCGN = new MessageEmbed()
      .setDescription(
        `<@&998206711951269948>Tối rồi chúc mọi người ngủ ngon ❤️❤️❤️`
      )
      .setColor(`#ff9999`)
      .setImage(
        "https://media.discordapp.net/attachments/970212235219726359/992454990293651507/7024cc2ec0cff896e2c8ce7ed750e099.jpg"
      );
    const embedCBS = new MessageEmbed()
      .setDescription(
        `<@&998206711951269948>Chúc mọi người buổi sáng vui vẻ ❤️❤️❤️`
      )
      .setColor(`#ff9999`)
      .setImage(
        "https://media.discordapp.net/attachments/970212235219726359/992455617031700520/af7d2c3c35c81064653a244b85c74f7c.jpg"
      );
    cron.schedule(
      "0 0 22 * * *",
      () => {
        client.channels.cache
          .get("1000804095495508078")
          .send({ embeds: [embedCGN] });
      },
      {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh",
      }
    );
    cron.schedule(
      "0 0 7 * * *",
      async () => {
        client.channels.cache
          .get("1000804095495508078")
          .send({ embeds: [embedCBS] });
      },
      {
        scheduled: true,
        timezone: "Asia/Ho_Chi_Minh",
      }
    );
  },
};
