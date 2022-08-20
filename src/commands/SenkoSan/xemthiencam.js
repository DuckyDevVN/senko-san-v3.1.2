const { MessageEmbed } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "thiencam",
  async execute(client, message, args) {
    const DTCUser = await client.balDTC(message.author.id);
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setThumbnail(message.member.displayAvatarURL())
          .setTitle(
            `${message.member.displayName}, đây là phần trăm điểm thiện cảm của mình dành cho bạn: ${DTCUser/(DTCUser+10000)*100}%`
          )
          .setTimestamp(Date.now())
          .setColor(config.colorEmbed),
      ],
    });
  },
};
