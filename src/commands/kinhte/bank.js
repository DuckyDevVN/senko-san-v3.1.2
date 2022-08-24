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
    if (!moneyAdd)
      return message.channel.send(
        `<@${message.author.id}>, bạn vui lòng nhập một số tiền nhất định!`
      );
    const row = new MessageActionRow().addComponents([
      new MessageButton().setLabel("Gửi").setCustomId("1").setStyle("SUCCESS"),
      new MessageButton().setLabel("Rút").setCustomId("2").setStyle("SUCCESS"),
    ]);
    const row4 = new MessageActionRow().addComponents([
      new MessageButton().setLabel("Gửi").setCustomId("7").setStyle("SUCCESS"),
      new MessageButton().setLabel("Rút").setCustomId("8").setStyle("SUCCESS"),
    ]);
    const row5 = new MessageActionRow().addComponents([
      new MessageButton().setLabel("Gửi").setCustomId("9").setStyle("SUCCESS"),
      new MessageButton().setLabel("Rút").setCustomId("10").setStyle("SUCCESS"),
    ]);
    const row6 = new MessageActionRow().addComponents([
      new MessageButton().setLabel("Gửi").setCustomId("11").setStyle("SUCCESS"),
      new MessageButton().setLabel("Rút").setCustomId("12").setStyle("SUCCESS"),
    ]);
    const row3 = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel("Coin")
        .setCustomId("3")
        .setStyle("SUCCESS")
        .setEmoji(config.iconDVTT),
      new MessageButton()
        .setLabel("Gold")
        .setCustomId("4")
        .setStyle("SUCCESS")
        .setEmoji(config.iconDVTTG),
      new MessageButton()
        .setLabel("Pre")
        .setCustomId("5")
        .setStyle("SUCCESS")
        .setEmoji(config.iconDVTTP),
      new MessageButton()
        .setLabel("Epic")
        .setCustomId("6")
        .setStyle("SUCCESS")
        .setEmoji(config.iconDVTTE),
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
        `${message.member.displayName}, bạn đã mở bank vui lòng chọn loại coin để gửi hoặc rút!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedGuiHoacRut = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã mở bank vui lòng chọn gửi hoặc rút!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedRutCoin = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã rút thành công ${moneyAdd} ${config.iconDVTT}}từ bank!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedGuiCoin = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã gửi thành công ${moneyAdd} ${config.iconDVTT} vô bank!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedRutGold = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã rút thành công ${moneyAdd} ${config.iconDVTTG}}từ bank!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedGuiGold = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã gửi thành công ${moneyAdd} ${config.iconDVTTG} vô bank!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedRutPre = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã rút thành công ${moneyAdd} ${config.iconDVTTP}}từ bank!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedGuiPre = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, bạn đã gửi thành công ${moneyAdd} ${config.iconDVTTP} vô bank!`
      )
      .setColor(config.colorEmbed)
      .setThumbnail(message.member.displayAvatarURL());
    const embedErr = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, số dư hiện tại của bạn không đủ điều kiện để thực hiện!`
      )
      .setColor(config.colorEmbedErr)
      .setThumbnail(message.member.displayAvatarURL());
    const m = await message.channel.send({
      components: [row3],
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
      if (id === "3") {
        collected.update({
          embeds: [embedGuiHoacRut],
          components: [row],
        });
      }
      if (id === "4") {
        collected.update({
          embeds: [embedGuiHoacRut],
          components: [row4],
        });
      }
      if (id === "5") {
        collected.update({
          embeds: [embedGuiHoacRut],
          components: [row5],
        });
      }
      if (id === "6") {
        collected.update({
          embeds: [embedGuiHoacRut],
          components: [row6],
        });
      }
      if (id === "1") {
        const moneyUser = await client.bal(message.author.id);
        if (moneyUser < moneyAdd) {
          collected.update({
            embeds: [embedErr],
            components: [row2],
          });
        } else {
          client.addBank(message.author.id, moneyAdd);
          client.rmv(message.author.id, moneyAdd);
          collected.update({
            embeds: [embedGuiCoin],
            components: [row2],
          });
        }
      }
      if (id === "2") {
        const bankUser = await client.balBank(message.author.id);
        if (bankUser < moneyAdd) {
          collected.update({
            embeds: [embedErr],
            components: [row2],
          });
        } else {
          client.rmvBank(message.author.id, moneyAdd);
          client.add(message.author.id, moneyAdd);
          collected.update({
            embeds: [embedRutCoin],
            components: [row2],
          });
        }
      }
      if (id === "7") {
        const moneyUser = await client.balGold(message.author.id);
        if (moneyUser < moneyAdd) {
          collected.update({
            embeds: [embedErr],
            components: [row2],
          });
        } else {
          client.addBankGold(message.author.id, moneyAdd);
          client.rmvGold(message.author.id, moneyAdd);
          collected.update({
            embeds: [embedGuiGold],
            components: [row2],
          });
        }
      }
      if (id === "8") {
        const bankUser = await client.balBankGold(message.author.id);
        if (bankUser < moneyAdd) {
          collected.update({
            embeds: [embedErr],
            components: [row2],
          });
        } else {
          client.rmvBankGold(message.author.id, moneyAdd);
          client.addGold(message.author.id, moneyAdd);
          collected.update({
            embeds: [embedRutGold],
            components: [row2],
          });
        }
      }
      if (id === "9") {
        const moneyUser = await client.balPre(message.author.id);
        if (moneyUser < moneyAdd) {
          collected.update({
            embeds: [embedErr],
            components: [row2],
          });
        } else {
          client.addBankPre(message.author.id, moneyAdd);
          client.rmvPre(message.author.id, moneyAdd);
          collected.update({
            embeds: [embedGuiPre],
            components: [row2],
          });
        }
      }
      if (id === "10") {
        const bankUser = await client.balBankPre(message.author.id);
        if (bankUser < moneyAdd) {
          collected.update({
            embeds: [embedErr],
            components: [row2],
          });
        } else {
          client.rmvBankPre(message.author.id, moneyAdd);
          client.addPre(message.author.id, moneyAdd);
          collected.update({
            embeds: [embedRutPre],
            components: [row2],
          });
        }
      }
      if (id === "11") {
        const moneyUser = await client.balEpic(message.author.id);
        if (moneyUser < moneyAdd) {
          collected.update({
            embeds: [embedErr],
            components: [row2],
          });
        } else {
          client.addBankEpic(message.author.id, moneyAdd);
          client.rmvEpic(message.author.id, moneyAdd);
          collected.update({
            embeds: [embedGuiEpic],
            components: [row2],
          });
        }
      }
      if (id === "12") {
        const bankUser = await client.balBankEpic(message.author.id);
        if (bankUser < moneyAdd) {
          collected.update({
            embeds: [embedErr],
            components: [row2],
          });
        } else {
          client.rmvBankEpic(message.author.id, moneyAdd);
          client.addEpic(message.author.id, moneyAdd);
          collected.update({
            embeds: [embedRutEpic],
            components: [row2],
          });
        }
      }
    });
  },
};
