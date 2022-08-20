const { MessageEmbed } = require("discord.js");
const config = require("../../config");

module.exports = {
  name: 'update',
  async execute(client, message, args) {
    if (message.author.id != config.ownerId) return message.channel.send({
      embeds: [
        new MessageEmbed()
        .setThumbnail(message.member.displayAvatarURL())
        .setTitle(`${message.member.displayName}, Bạn không đủ quyền hạn để sử dụng lệnh này`)
        .setTimestamp(Date.now())
        .setColor(config.colorEmbedErr)
      ]
    });
    message.channel.send({
      embeds: [
        new MessageEmbed()
        .setThumbnail(message.member.displayAvatarURL())
        .setTitle(`Senko san update`)
        .setDescription(`Kon'nichiwa\nsenko đã cập nhật thành công bản 3.1.2 beta và đây là beta nên một số lệnh vẫn chưa dùng được tuy nhiên\n mình đã có một số cập nhật mới:\n Sửa lại đơn vị tiền tệ thành SenkoCoin \n Điểm thiện cảm đã quay trở lại(tính bằng %) \nĐã có thêm Bank \n Đã có thể đăng kí kết hôn và xem kết hôn \n và còn nhiều thứ khác... được rồi bye các bạn!`)
        .setTimestamp(Date.now())
        .setImage(`https://s3.zerochan.net/240/47/30/2576547.jpg`)
        .setColor(config.colorEmbedErr)
      ]
    });
  }
}