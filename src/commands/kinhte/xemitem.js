const { MessageEmbed } = require("discord.js");
const inventory = require("../../Schemas/inventory");
const arrayItem = []
const config = require('../../config')
const itemlist = require('../../itemList')
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
					if (key === "-1")
						return `🍱bento số lượng ${data.Invemtory["-1"]}`
					else if (key === "-2")
						return `💣bom số lượng ${data.Invemtory["-2"]}`
					else if (key === "-3")
						return `💍nhẫn số lượng ${data.Invemtory["-3"]}`
					else if (key === "-4")
						return `📜đơn ly hôn số lượng ${data.Invemtory["-4"]}`
					else if (key === "-5")
						return `🍌chuối số lượng ${data.Invemtory["-5"]}`
					else if (key === "-6")
						return `🍌☢️chuối độc số lượng ${data.Invemtory["-6"]}`
					else if (key === "-7")
						return `🧪thuốc độc số lượng ${data.Invemtory["-7"]}`
					else if (key === "-8")
						return `💊thuôc giải độc số lượng ${data.Invemtory["-8"]}`
					else if (key === "-9")
						return `🧨pháo số lượng ${data.Invemtory["-9"]}`
					else if (key === "-b1")
						return `:shield:khiên số lượng ${data.Invemtory["-b1"]}`
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