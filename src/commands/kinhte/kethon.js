const { MessageEmbed } = require("discord.js");
const config = require("../../config");
const kethonUser = require("../../Schemas/kethon");
const itemUser = require("../../Schemas/inventory");
module.exports = {
  name: "kethon",
  async execute(client, message, args) {
    const userMember = message.mentions.members.first();
    if (!userMember)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setThumbnail(message.member.displayAvatarURL())
            .setTimestamp(Date.now())
            .setColor(config.colorEmbed)
            .setTitle(
              `${message.member.displayName}, bạn vui lòng chọn đối tượng kết hôn`
            ),
        ],
      });
    const param = {
      User: message.author.id,
    };
    itemUser.findOne(param, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.Invemtory).includes("-3");
        if (!hasItem) {
          message.chennel.send({
            embeds: [
              new MessageEmbed()
                .setThumbnail(message.member.displayAvatarURL())
                .setTimestamp(Date.now())
                .setTitle(
                  `${message.member.displayName}, bạn hiện tại chưa sở hựa một chiếc 💍nhẫn nào!`
                )
                .setColor(config.colorEmbed),
            ],
          });
        } else {
          kethonUser.findOne(param, async (err, data) => {
            if (data) {
              message.channel.send({
                embeds: [
                  new MessageEmbed()
                    .setThumbnail(message.member.displayAvatarURL())
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn hiện tại đang kết hôn với ${client.members.get(data.Bandoi).displayName}!`
                    )
                    .setColor(config.colorEmbed),
                ],
              });
            } else {
              message.channel.send({
                embeds: [
                  new MessageEmbed()
                    .setThumbnail(message.member.displayAvatarURL())
                    .setTimestamp(Date.now())
                    .setTitle(
                      `Chúc mừng ${message.member.displayName} kết hôn với ${userMember.displayName}. Chúc hai bạn hạnh phúc!`
                    )
                    .setImage(`https://64.media.tumblr.com/8ab2ed41f68c759e08e26f4f7ac910d1/tumblr_p8vlrzczKQ1u329fso1_540.gif`)
                    .setColor(config.colorEmbed),
                ],
              });
              new kethonUser({
                User: message.author.id,
                Bandoi: userMember.id
              }).save();
            }
          });
        }
      }
    });
  },
};
