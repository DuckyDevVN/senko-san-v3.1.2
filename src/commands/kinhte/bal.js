const { MessageEmbed } = require("discord.js");
const config = require('../../config');
module.exports = {
  name: "xemtien",
  async execute(client, message, args) {
    const money = await client.bal(message.author.id);
    const bank = await client.balBank(message.author.id);
    await message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle(`[Trong ví]: ${money} ${config.iconDVTT}\n[Trong Bank]: ${bank} ${config.iconDVTT}`)
          .setColor(config.colorEmbed)
          .setThumbnail(message.member.displayAvatarURL()),
      ],
    });
  },
};