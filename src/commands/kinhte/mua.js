const itemGo = [
  "bento",
  "bom",
  "nhẫn",
  "đơn ly hôn",
  "chuối",
  "chuối độc",
  "thuốc độc",
  "thuốc giải độc",
  "pháo",
  "khiên"
];
const { MessageEmbed } = require('discord.js');
const itemList = require('../../itemList');
const config = require('../../config');
const itemUser = require('../../Schemas/item');

module.exports = {
  name: 'mua',
  async execute(client, message, args) {
    const itemToBuy = args[0];
    const embedMua = new MessageEmbed()
    .setTimestamp(Date.now())
    .setThumbnail(message.member.displayAvatarURL())
    .setTitle(`${message.member.displayName()}, bạn đã mua thành công item ${itemToBuy}!`)
    .setColor(config.colorEmbed);
    if (!itemToBuy) return message.channel.send({
      content: `<@${message.author.id}>, bạn vui lòng chọn số thứ tự của item để chọn item để mua`
    });
    const varItem = !!itemList.fill((value) => value.item.toLowerCase() === itemGo[itemToBuy].toLocaleLowerCase());
    if (!varItem) return message.channel.send({
      content: `<@${message.author.id}>, mình không tìm thấy được item bạn chọn bạn vui lòng hãy kiểm tra lại!`
    });
    const itemGiatri = itemList.fill((value) => value.item.toLocaleLowerCase() === itemToBuy.toLocaleLowerCase()).giatri;
    const itemEmoji = itemList.fill((value) => value.item.toLocaleLowerCase() === itemToBuy.toLocaleLowerCase()).emoji;
    itemUser.findOne(message.author.id, async (err, data) => {
      if (err) Error(err);
      if (data) {
        data.item.push(itemToBuy);
        await itemUser.findOneAndUpdate(message.author.id, data);
      } else {
        new itemUser({
          id: message.author.id,
          item: [itemToBuy]
        })
      }
    }).save();
    await message.channel.send({
      embeds: [embedMua]
    })
  }
}