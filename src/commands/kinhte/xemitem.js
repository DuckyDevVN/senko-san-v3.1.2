const { MessageEmbed } = require("discord.js");
const inventory = require("../../Schemas/inventory");
const arrayItem = []
const config = require('../../config')
module.exports = {
	name: "xemitem",
	async execute(client, message, args) {
		const errtl = new MessageEmbed()
			.setDescription(`<@${message.author.id}>, hiện tại bạn không có item nào trong túi`)
			.setColor(config.colorEmbed);
		inventory.findOne({ User: message.author.id }, async (err, data) => {
			if (!data) return message.channel.send({
				embeds: [errtl]
			})
			const mappInventory = Object.keys(data.Invemtory)
				.map((key) => {
					return `${key} - ${data.Invemtory[key]}`;
				})
			const trl = new MessageEmbed()
				.setTitle(`Đây là những vật phẩm/item mà ${message.member.displayName} đang có:`)
				.setDescription(mappInventory.join("\n"))
				.setColor(config.colorEmbed);
			message.channel.send({
				embeds: [trl]
			})
		})
	},
};