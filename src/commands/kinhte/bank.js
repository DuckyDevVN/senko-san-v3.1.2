const {
  MessageActionRow,
  MessageEmbed,
  MessageButton,
  MessageCollector,
} = require("discord.js");
const config = require("../../config");

module.exports = {
  name: "bank",
  async execute(client, message, args) {
    const moneyAdd = parseInt(args[0]);
    if (!moneyAdd) return message.channel.send(`<@${message.author.id}>, bạn vui lòng nhập một số tiền nhất định!`) 
    const row = new MessageActionRow().addComponents([
      new MessageButton().setLabel("Gửi").setCustomId("1").setStyle("SUCCESS"),
      new MessageButton().setLabel("Rút").setCustomId("2").setStyle("SUCCESS"),
    ]);
    const row2 = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel("Gửi")
        .setCustomId("1")
        .setStyle("SUCCESS")
        .setDisabled(true),
      new MessageButton()
        .setLabel("Rút")
        .setCustomId("2")
        .setStyle("SUCCESS")
        .setDisabled(true),
    ]);
    const embed = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã mở bank vui lòng chọn gửi hoặc rút!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedRut = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã rút thành công ${moneyAdd} từ bank!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedGui = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã gửi thành công ${moneyAdd} vô bank!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const m = await message.channel.send({
      components: [row],
      embeds: [embed],
    });
    const filter = (interaction) => {
      if (interaction.user.id === message.author.id) return true;
      else
        interaction.reply({
          content: `Bạn không thể dùng Button của người khác!`,
          ephemeral: true,
        });
    };

    const collector1 = m.createMessageComponentCollector({
      filter,
    });

    collector1.on("collect", async (collected) => {
      const id = collected.customId;
      if (id === "1") {
        if (client.bal(message.author.id.toString()) < moneyAdd)  return;
        client.addBank(message.author.id.toString(), moneyAdd);
        client.rmv(message.author.id.toString(), moneyAdd);
        await collected.update({
          embeds: [embedGui],
          components: [row2],
        });
      }
      if (id === "2") {
        if (client.balBank(message.author.id.toString()) < moneyAdd) return;
        client.rmvBank(message.author.id.toString(), moneyAdd);
        client.add(message.author.id.toString(), moneyAdd);
        await collected.update({
          embeds: [embedRut],
          components: [row2],
        });
      }
    });
  },
};