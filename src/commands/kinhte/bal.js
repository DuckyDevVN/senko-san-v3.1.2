const { MessageEmbed } = require("discord.js");
const config = require('../../config');
module.exports = {
  name: "xemcoin",
  async execute(client, message, args) {
    const money = await client.bal(message.author.id);
    const bank = await client.balBank(message.author.id);
    const gold = await client.balGold(message.author.id);
    const pre = await client.balPre(message.author.id);
    const epic = await client.balEpic(message.author.id);
    const bankGold = await client.balBankGold(message.author.id);
    const bankPre = await client.balBankPre(message.author.id);
    const bankEpic = await client.balBankEpic(message.author.id);
    const embedCoin = new MessageEmbed()
    .setTimestamp(Date.now())
    .setDescription(`**[Trong ví]:**\n[SenkoCoins]: ${money} ${config.iconDVTT} \n[SenkoGoldCoins]: ${gold} ${config.iconDVTTG} \n[SenkoPremiumCoins]: ${pre} ${config.iconDVTTP} \n[SenkoEpicCoins]: ${epic} ${config.iconDVTTE}\n**[Trong Bank]:**\n[SenkoCoins]: ${bank} ${config.iconDVTT} \n[SenkoGoldCoins]: ${bankGold} ${config.iconDVTTG} \n[SenkoPremiumCoins]: ${bankPre} ${config.iconDVTTP} \n[SenkoEpicCoins]: ${bankEpic} ${config.iconDVTTE}`)
    .setColor(config.colorEmbed)
    .setThumbnail(message.member.displayAvatarURL())
    .setImage(`https://cdn.discordapp.com/attachments/820557032016969751/858548806673104906/now.gif`);
    await message.channel.send({
      embeds: [
        embedCoin
      ],
    });
  },
};
