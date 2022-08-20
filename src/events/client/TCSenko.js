const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    const DTCAdd = 100;
    const tagbot = `<@${client.user.id}>`;
    const tagbot2 = message.mentions.members.first();
    if (!tagbot2) return;
    if (tagbot2.id === client.user.id || message.content.startsWith(tagbot)) {
      if (message.content.toLowerCase().includes("dễ thương")) {
        const embed = new MessageEmbed()
          .setDescription(`Ừm, cảm ơn nhá <@${message.author.id}>💖💖💖`)
          .setImage(
            `https://media.discordapp.net/attachments/964411032888049674/985183745940263063/RDT_20220611_2108154845018802574574340.jpg`
          );
        message.channel.send({ embeds: [embed] });
        message.react(`💖`);
        message.react(`💝`);
        message.react(`💞`);
        client.addDTC(message.author.id, DTCAdd)
      }
      if (message.content.toLowerCase().includes("dâm đãng")) {
        const embed3 = new MessageEmbed()
          .setDescription(
            `Ừm, cảm ơ... Mà khoang <@${message.author.id}> mình đâu có dâm đãng💖💖💖`
          )
          .setImage(
            `https://media.discordapp.net/attachments/964411032888049674/985183745940263063/RDT_20220611_2108154845018802574574340.jpg`
          );
        message.channel.send({ embeds: [embed3] });
        message.react(`💖`);
        message.react(`💝`);
        message.react(`💞`);
        client.addDTC(message.author.id, DTCAdd)
      }
      if (message.content.toLowerCase().includes("ngủ ngon")) {
        const embed3 = new MessageEmbed()
          .setDescription(`Ừm, chúc <@${message.author.id}> ngủ ngon💖💖💖`)
          .setImage(
            `https://media.discordapp.net/attachments/970212235219726359/992454990293651507/7024cc2ec0cff896e2c8ce7ed750e099.jpg`
          )
          .setColor("#9999FF");
        message.channel.send({ embeds: [embed3] });
        message.react(`💖`);
        message.react(`💝`);
        message.react(`💞`);
        client.addDTC(message.author.id, DTCAdd)
      }
      if (message.content.toLowerCase().includes("buổi sáng")) {
        const embed3 = new MessageEmbed()
          .setDescription(
            `Ừm, <@${message.author.id}> chúc bạn có một buổi sáng tốt lành💖💖💖`
          )
          .setImage(
            `https://media.discordapp.net/attachments/970212235219726359/992455617031700520/af7d2c3c35c81064653a244b85c74f7c.jpg`
          )
          .setColor("#9999FF");
        message.channel.send({ embeds: [embed3] });
        message.react(`💖`);
        message.react(`💝`);
        message.react(`💞`);
        client.addDTC(message.author.id, DTCAdd)
      }
    }
  },
};
