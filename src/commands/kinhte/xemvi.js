const { MessageEmbed } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'xemvi',
  async execute(client, message, args) {
    const money = await client.bal(message.author.id)
    const gold = await client.balGold(message.author.id);
    const pre = await client.balPre(message.author.id);
    const epic = await client.balEpic(message.author.id);
    const embed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setDescription(`**[Trong ví]:**\n[SenkoCoins]: ${money} ${config.iconDVTT} \n[SenkoGoldCoins]: ${gold} ${config.iconDVTTG} \n[SenkoPremiumCoins]: ${pre} ${config.iconDVTTP} \n[SenkoEpicCoins]: ${epic} ${config.iconDVTTE}`)
      .setThumbnail(message.member.displayAvatarURL())
      .setImage(config.imageEmbed)
      .setColor(config.colorEmbed);
    await message.channel.send({
      embeds: [embed]
    });
  },
};