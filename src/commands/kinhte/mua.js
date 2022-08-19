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
  "khiên",
];
const { MessageEmbed } = require("discord.js");
const itemList = require("../../itemList");
const config = require("../../config");
const itemUser = require("../../Schemas/inventory");

module.exports = {
  name: "mua",
  async execute(client, message, args) {
    let itemToBuy = itemGo[args[0]];
    if (!itemToBuy)
      return message.channel.send({
        content: `<@${message.author.id}>, bạn vui lòng chọn số thứ tự của item để chọn item để mua`,
      });
    const varItem = !!itemList.find(
      (value) => value.item.toLowerCase() === itemToBuy.toLowerCase()
    );
    if (!varItem)
      return message.channel.send({
        content: `<@${message.author.id}>, mình không tìm thấy được item bạn chọn bạn vui lòng hãy kiểm tra lại!`,
      });
    const itemGiatri = itemList.find(
      (value) => value.item.toLowerCase() === itemToBuy.toLowerCase()
    ).giatri;
    const tienUser = await client.bal(message.author.id);
    if (tienUser < itemGiatri)
      return message.channel.send(
        `Số tiền hiện tại của bạn hiện tại không đủ để mua item này`
      );
    const emojiItem = itemList.find(
      (value) => value.item.toLowerCase() === itemToBuy.toLowerCase()
    ).emoji;
    const embedMua = new MessageEmbed()
      .setTimestamp(Date.now())
      .setThumbnail(message.member.displayAvatarURL())
      .setTitle(
        `${message.member.displayName}, bạn đã mua thành công item ${
          emojiItem + itemToBuy
        }!!`
      )
      .setColor(config.colorEmbed);

    if (itemToBuy.toLowerCase() === "bento") itemToBuy = "-1";
    else if (itemToBuy.toLowerCase() === "bom") itemToBuy = "-2";
    else if (itemToBuy.toLowerCase() === "nhẫn") itemToBuy = "-3";
    else if (itemToBuy.toLowerCase() === "đơn ly hôn") itemToBuy = "-4";
    else if (itemToBuy.toLowerCase() === "chuối") itemToBuy = "-5";
    else if (itemToBuy.toLowerCase() === "chuối độc") itemToBuy = "-6";
    else if (itemToBuy.toLowerCase() === "thuốc độc") itemToBuy = "-7";
    else if (itemToBuy.toLowerCase() === "thốc giải độc") itemToBuy = "-8";
    else if (itemToBuy.toLowerCase() === "pháo") itemToBuy = "-9";
    else if (itemToBuy.toLowerCase() === "khiên") itemToBuy = "-b1";

    const param = {
      User: message.author.id,
    };
    itemUser.findOne(param, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.Invemtory).includes(itemToBuy);
        if (!hasItem) {
          data.Invemtory[itemToBuy] = 1;
        } else {
          data.Invemtory[itemToBuy]++;
        }
        await itemUser.findOneAndUpdate(param, data);
      } else {
        new itemUser({
          User: message.author.id,
          Invemtory: {
            [itemToBuy]: 1,
          },
        }).save();
      }
      message.channel.send({
        embeds: [embedMua],
      });
      client.rmv(message.author.id, itemGiatri);
    });
  },
};
