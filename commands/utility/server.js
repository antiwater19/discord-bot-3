const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`이 서버의 이름은 '${interaction.guild.name}' 이고 ${interaction.guild.memberCount} 명의 유저가 있습니다. \nThis server is ${interaction.guild.name} and has ${interaction.guild.memberCount}members.`);
	},
};