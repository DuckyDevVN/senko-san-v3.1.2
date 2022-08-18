const { MessageEmbed } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'xemvi',
  async execute(client, message, args) {
    const m = await client.bal(message.author.id)
    const embed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setTitle(`[Trong Ví]: ${m} ${config.iconDVTT}`)
      .setThumbnail(message.member.displayAvatarURL())
      .setColor(config.colorEmbed);
    await message.channel.send({
      embeds: [embed]
    });
  },
};