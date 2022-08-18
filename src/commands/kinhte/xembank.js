const { MessageEmbed } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'xembank',
  async execute(client, message, args) {
    const m = await client.balBank(message.author.id)
    const embed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setTitle(`[Trong Bank]: ${m} ${config.dvtt}`)
      .setThumbnail(message.member.displayAvatarURL())
      .setColor(config.colorEmbed);
    await message.channel.send({
      embeds: [embed]
    });
  },
};