const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../config");
const Canvas = require("canvas");
const background =
  "https://media.discordapp.net/attachments/973951116477861928/981557845935931392/Resizer_16540919855601.jpeg";

const dim = {
  height: 675,
  width: 1200,
  margin: 50,
};

const av = {
  size: 256,
  x: 480,
  y: 170,
};
module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
    let username = member.displayName;
    let avatarURL = member.user.displayAvatarURL({
      format: "png",
      dynamic: false,
      size: av.size,
    });
    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");
    // draw in the background
    const backimg = await Canvas.loadImage(background);
    ctx.drawImage(backimg, 0, 0);
    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(
      dim.margin,
      dim.margin,
      dim.width - 2 * dim.margin,
      dim.height - 2 * dim.margin
    );
    const avimg = await Canvas.loadImage(avatarURL);
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      av.x + av.size / 2,
      av.y + av.size / 2,
      av.size / 2,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avimg, av.x, av.y);
    ctx.restore();
    // write in text
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    // draw in Welcome
    ctx.font = "50px Sans";
    ctx.fillText(
      `CHÀO MỪNG TỚI ${member.guild.name.toUpperCase()}`,
      dim.width / 2,
      dim.margin + 70
    );
    // draw in the username
    ctx.font = "60px Sans";
    ctx.fillText(username, dim.width / 2, dim.height - dim.margin - 125);
    // draw in to the server
    ctx.font = "40px Sans";
    ctx.fillText(
      `BẠN LÀ MEMBER THỨ ${member.guild.memberCount}`,
      dim.width / 2,
      dim.height - dim.margin - 50
    );
    const attachment = new MessageAttachment(
     await canvas.toBuffer(),
      "welcome.png"
    );
    if (member.user.bot) {
      const role = member.guild.roles.cache.get("974253170022838272");
      member.roles.add(role);
    } else {
      const welcomeChannelId = "978582099533656104";
      member.guild.channels.cache.get(welcomeChannelId).send({
        embeds: [
          new MessageEmbed()
            .setTitle(
              `${member.displayName} chào mừng bạn tới ${member.guild.name}!\nchúc bạn có một trải nghiệm thú zị<a:SenkoRainbow:981933949477609512>!`
            )
            .setTimestamp(Date.now())
            .setColor(config.colorEmbed)
            .setImage('attachment://welcome.png'),
        ],
        files: [attachment]
      });
      const role = member.guild.roles.cache.get("974223013828493352");
      member.roles.add(role);
    }
  },
};
