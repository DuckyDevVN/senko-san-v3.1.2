const { MessageEmbed } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'xembank',
  async execute(client, message, args) {
    const bank = await client.balBank(message.author.id)
    const bankGold = await client.balBankGold(message.author.id);
    const bankPre = await client.balBankPre(message.author.id);
    const bankEpic = await client.balBankEpic(message.author.id);
    const embed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setDescription(`**[Trong Bank]:**\n[SenkoCoins]: ${bank} ${config.iconDVTT} \n[SenkoGoldCoins]: ${bankGold} ${config.iconDVTTG} \n[SenkoPremiumCoins]: ${bankPre} ${config.iconDVTTP} \n[SenkoEpicCoins]: ${bankEpic} ${config.iconDVTTE}`)
      .setThumbnail(message.member.displayAvatarURL())
      .setImage(config.imageEmbed)
      .setColor(config.colorEmbed);
    await message.channel.send({
      embeds: [embed]
    });
  },
};