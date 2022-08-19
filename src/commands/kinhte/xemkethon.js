const bandoiUser = require("../../Schemas/kethon");
const { MessageEmbed } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "xemkethon",
  async execute(client, message, args) {
    const xemUser = message.mentions.members.first() || message.member;
    const param = {
      User: xemUser.id,
    };
    bandoiUser.findOne(param, async (err, data) => {
      if (!data) {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setThumbnail(xemUser.displayAvatarURL())
              .setTitle(`${xemUser.displayName} chưa kết hôn với ai!`)
              .setColor(config.colorEmbed)
              .setTimestamp(Date.now()),
          ],
        });
      } else {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setThumbnail(xemUser.displayAvatarURL())
              .setTitle(`${xemUser.displayName} đã kết hôn với ${data.Bandoi}!`)
              .setColor(config.colorEmbed)
              .setTimestamp(Date.now()),
          ],
        });
      }
    });
  },
};
