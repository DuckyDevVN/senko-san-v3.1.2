const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "xemtien",
  async execute(client, message, args) {
    const money = await client.bal(message.author.id);
    const bank = await client.balBank(message.author.id);
    await message.channel.send({
      embeds: [
        new MessageEmbed()
          .setTitle(`[Trong ví]: ${money}\n[Trong Bank]: ${bank}`)
          .setThumbnail(message.member.displayAvatarURL()),
      ],
    });
  },
};