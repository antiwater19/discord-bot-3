const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	// 명령어 쿨타임 cooldown변수 
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};