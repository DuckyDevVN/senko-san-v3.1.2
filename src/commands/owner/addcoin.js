const config = require('../../config');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'addcoin',
  async execute(client, message, args) {
    if (message.author.id != config.ownerId) return message.channel.send({
      embeds: [
        new MessageEmbed()
        .setThumbnail(message.member.displayAvatarURL())
        .setTitle(`${message.member.displayName}, Bạn không đủ quyền hạn để sử dụng lệnh này`)
        .setTimestamp(Date.now())
        .setColor(config.colorEmbedErr)
      ]
    });
    const coinAdd = parseInt(args[0]);
    if (!coinAdd) return message.channel.send({
      embeds: [
        new MessageEmbed()
        .setThumbnail(message.member.displayAvatarURL())
        .setTitle(`${message.member.displayName}, Bạn vui lòng nhập số lượng coin nhất định`)
        .setTimestamp(Date.now())
        .setColor(config.colorEmbedErr)
      ]
    })
    const memberAddCoin = message.mentions.members.first() || message.member;
    let memberName = `${memberAddCoin.displayName}`
    if (message.author.id === memberAddCoin) memberName = `bạn` ;
    client.add(memberAddCoin.id, coinAdd);
		message.channel.send({
      embeds: [
        new MessageEmbed()
        .setThumbnail(message.member.displayAvatarURL())
        .setTitle(`${message.member.displayName}, đã cộng thành công ${coinAdd} ${config.iconDVTT} cho ${memberName}`)
        .setTimestamp(Date.now())
        .setColor(config.colorEmbed)
      ]
    });
  }
}