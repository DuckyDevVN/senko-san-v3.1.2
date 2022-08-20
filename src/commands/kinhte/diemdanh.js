const { MessageEmbed } = require("discord.js");
const config = require("../../config");
const userTime = require("../../Schemas/thoigian");

module.exports = {
  name: "diemdanh",
  aliases: ["dd"],
  async execute(client, message, args) {
    const timeOut = 86400000;
    const coinAdd = 100;
    const paragram = {
      User: message.author.id,
    };
    userTime.findOne(paragram, async (err, data) => {
      if (data) {
        if (timeOut - (Date.now() - data.Thoigian) > 0) {
          message.channel.send({
            embeds: [
              new MessageEmbed()
                .setTitle(
                  `${message.member.displayName}, Bạn đã điểm danh ngày hôm nay rồi bạn có thể điểm danh vào ngày mai!`
                )
                .setThumbnail(message.member.displayAvatarURL())
                .setTimestamp(Date.now())
                .setColor(config.colorEmbedErr),
            ],
          });
        } else {
          userTime.findOneAndUpdate(paragram, { Thoigian: Date.now() });
          await client.add(message.author.id, coinAdd);
          message.channel.send({
            embeds: [
              new MessageEmbed()
                .setTitle(
                  `${message.member.displayName}, cảm ơn bạn đã điểm danh ngày hôm nay và đây là phần thưởng của bạn ${coinAdd} ${config.iconDVTT}!`
                )
                .setThumbnail(message.member.displayAvatarURL())
                .setTimestamp(Date.now())
                .setColor(config.colorEmbed),
            ],
          });
        }
      } else {
        new userTime({
          User: message.author.id,
          Thoigian: Date.now(),
        }).save();
        await client.add(message.author.id, coinAdd);
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle(
                `${message.member.displayName}, cảm ơn bạn đã điểm danh ngày hôm nay và đây là phần thưởng của bạn ${coinAdd} ${config.iconDVTT}!`
              )
              .setThumbnail(message.member.displayAvatarURL())
              .setTimestamp(Date.now())
              .setColor(config.colorEmbed),
          ],
        });
      }
    });
  },
};