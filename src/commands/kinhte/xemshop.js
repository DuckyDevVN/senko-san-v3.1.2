const { MessageEmbed } = require("discord.js");
const itemList = require("../../itemList");
const config = require("../../config");
module.exports = {
  name: "xemshop",
  aliases: ["shop"],
  async execute(client, message, args) {
    const shoplist = itemList.map((values, index) => {
      return `${index++}#${values.emoji + values.item} => ${values.giatri} ${config.iconDVTT}`;
    });
    await message.channel.send({
      embeds: [
        new MessageEmbed()
          .setDescription(shoplist.join("\n"))
          .setColor(config.colorEmbed),
      ],
    });
  },
};
