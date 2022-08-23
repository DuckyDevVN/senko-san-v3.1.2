const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const config = require("../../config");
const itemUser = require("../../Schemas/item");

module.exports = {
  name: "naubanh",
  /**trứng muối: 
    - Bột mì
    - trứng muối
    - bơ
    đậu xanh:
    - Bột mì
    - Trứng
    - bơ
    - đậu xanh
    thập cẩm: 
    - bột mì
    - trứng 
    - bơ
    - lạp xưởng 
    - hạt dưa
    - hạt sen*/
  async execute(client, message, args) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Chưa Có Lựa Chọn!")
        .addOptions([
          {
            label: `Thập cẩm`,
            description: "nấu bánh nhân thập cẩm",
            value: "TC",
          },
          {
            label: `Trứng muối`,
            description: "nấu bánh nhân trứng muối",
            value: "TM",
          },
          {
            label: `Đậu xanh`,
            description: "nấu bánh nhân đậu xanh",
            value: "DX",
          },
        ])
    );
    const embed = new MessageEmbed()
      .setTitle(
        `${message.member.displayName}, mình mời bạn chọn loại bánh mà mình muốn nấu!`
      )
      .setTimestamp(Date.now())
      .setThumbnail(message.member.displayAvatarURL())
      .setColor(config.colorEmbed);
    const m = await message.channel.send({
      embeds: [embed],
      components: [row],
    });
    const collector = m.createMessageComponentCollector({
      componentType: "SELECT_MENU",
    });
    collector.on("collect", async (collected) => {
      const value = collected.values[0];
      if (value === "DX") {
        // Bánh Đậu Xanh
        const item = "bột mì";
        const item2 = "trứng";
        const item3 = "bơ";
        const item4 = "đậu xanh";
        const pram = {
          User: message.author.id,
        };
        itemUser.findOne(pram, async (err, data) => {
          if (!data) {
            collected.update({
              embeds: [
                new MessageEmbed()
                  .setTitle(
                    `${message.member.displayName}, bạn chưa sở hữu một nguyên liệu nào!`
                  )
                  .setTimestamp(Date.now())
                  .setColor(config.colorEmbedErr)
                  .setThumbnail(message.member.displayAvatarURL()),
              ],
            });
          } else {
            const hasItem = Object.keys(data.Invemtory).includes(item);
            const hasItem2 = Object.keys(data.Invemtory).includes(item2);
            const hasItem3 = Object.keys(data.Invemtory).includes(item3);
            const hasItem4 = Object.keys(data.Invemtory).includes(item4);
            if (!hasItem)
              return {
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              };
            else if (!hasItem2)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item2} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem3)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item3} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem4)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item4} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else {
            }
          }
        });
      }
      // Bánh Trứng Muối
      if (value === "TM") {
        const item = "bột mì";
        const item2 = "trứng muối";
        const item3 = "bơ";
        const pram = {
          User: message.author.id,
        };
        itemUser.findOne(pram, async (err, data) => {
          if (!data) {
            collected.update({
              embeds: [
                new MessageEmbed()
                  .setTitle(
                    `${message.member.displayName}, bạn chưa sở hữu một nguyên liệu nào!`
                  )
                  .setTimestamp(Date.now())
                  .setColor(config.colorEmbedErr)
                  .setThumbnail(message.member.displayAvatarURL()),
              ],
            });
          } else {
            const hasItem = Object.keys(data.Invemtory).includes(item);
            const hasItem2 = Object.keys(data.Invemtory).includes(item2);
            const hasItem3 = Object.keys(data.Invemtory).includes(item3);
            if (!hasItem)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item} để nấu bánh trứng muối!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem2)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item2} để nấu bánh trứng muối!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem3)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item} để nấu bánh trứng muối!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else {
            }
          }
        });
      }
      if (value === "TC") {
        // Bánh thập cẩm
        const item = "bột mì";
        const item2 = "trứng";
        const item3 = "bơ";
        const item4 = "lạp xưởng";
        const item5 = "hạt dưa";
        const item6 = "hạt sen";
        const pram = {
          User: message.author.id,
        };
        itemUser.findOne(pram, async (err, data) => {
          if (!data) {
            collected.update({
              embeds: [
                new MessageEmbed()
                  .setTitle(
                    `${message.member.displayName}, bạn chưa sở hữu một nguyên liệu nào!`
                  )
                  .setTimestamp(Date.now())
                  .setColor(config.colorEmbedErr)
                  .setThumbnail(message.member.displayAvatarURL()),
              ],
            });
          } else {
            const hasItem = Object.keys(data.Invemtory).includes(item);
            const hasItem2 = Object.keys(data.Invemtory).includes(item2);
            const hasItem3 = Object.keys(data.Invemtory).includes(item3);
            const hasItem4 = Object.keys(data.Invemtory).includes(item4);
            const hasItem5 = Object.keys(data.Invemtory).includes(item5);
            const hasItem6 = Object.keys(data.Invemtory).includes(item6);
            if (!hasItem)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem2)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item2} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem3)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item3} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem4)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item4} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem5)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item5} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else if (!hasItem6)
              return collected.update({
                embeds: [
                  new MessageEmbed()
                    .setTimestamp(Date.now())
                    .setTitle(
                      `${message.member.displayName}, bạn đang còn thiếu ${item6} để nấu bánh đậu xanh!`
                    )
                    .setColor(config.colorEmbedErr)
                    .setThumbnail(message.member.displayAvatarURL()),
                ],
              });
            else {
            }
          }
        });
      }
    });
  },
};
