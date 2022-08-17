const { MessageEmbed } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "ping",
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle(`[CLIENT PING]: \`${client.ws.ping}ms\``)
      .setColor(config.colorEmbed);
    await message.channel.send({
      embeds: [embed],
    });
  },
};
