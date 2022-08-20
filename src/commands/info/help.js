const {
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
} = require("discord.js");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  name: "help",
  async execute(client, message, args) {
    const kinhteCommnad = new MessageEmbed()
      .setTitle(`SENKO HELP COMMANDS`)
      .setDescription(
        `skxemcoin\nskbank[số tiền]\nskdiemdanh\nskmua[số thứ tự item]\nskxembank\nskxemitem\nskxemkethon<người cần xem>\nskxemshop\nskxemvi\nskkethon [người muốn kết hôn]\nskdoitien\n\n\nchú thích: [] là bắc buộc | <> là không bắc buộc`
      )
      .setTimestamp(Date.now())
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const infoCommnad = new MessageEmbed()
      .setTitle(`SENKO HELP COMMANDS`)
      .setDescription(
        `skhelp\nskping\nskavatar <người cần xem>\nskbotinfo\nskavtserver\n\n\nchú thích: [] là bắc buộc | <> là không bắc buộc`
      )
      .setTimestamp(Date.now())
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const DTCCommnad = new MessageEmbed()
      .setTitle(`SENKO HELP COMMANDS`)
      .setDescription(
        `skxemthiencam\n@senko-san dễ thương\n@senko-san damdang\n\n\nchú thích: [] là bắc buộc | <> là không bắc buộc`
      )
      .setTimestamp(Date.now())
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const HelpCommnad = new MessageEmbed()
      .setTitle(`SENKO HELP COMMANDS`)
      .setDescription(
        `${message.member.displayName}, mời bạn chọn thể loại!\n\n\nchú thích: [] là bắc buộc | <> là không bắc buộc`
      )
      .setTimestamp(Date.now())
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Chưa Có Lựa Chọn!")
        .addOptions([
          {
            label: `Kinh tế`,
            description: "xem lệnh về kinh tế",
            value: "KT_option",
          },
          {
            label: `Info`,
            description: "xem lệnh về Info",
            value: "IF_option",
          },
          {
            label: `Senko`,
            description: "xem lệnh về Senko",
            value: "SK_option",
          },
        ])
    );
    const m = await message.channel.send({
      embeds: [HelpCommnad],
      components: [row],
    });
    const collector = m.createMessageComponentCollector({
      componentType: "SELECT_MENU",
    });
    collector.on("collect", async (collected) => {
      const value = collected.values[0];
      if (value === "KT_option") {
        collected.update({
          embeds: [kinhteCommnad],
        });
      }
      if (value === "IF_option") {
        collected.update({
          embeds: [infoCommnad],
        });
      }
      if (value === "SK_option") {
        collected.update({
          embeds: [DTCCommnad],
        });
      }
    });
  },
};
