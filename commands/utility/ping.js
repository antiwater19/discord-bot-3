const { SlashCommandBuilder } = require('discord.js');
const { wait, a } = require('partial-js');

module.exports = {
	// 명령어 쿨타임 cooldown변수 
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
		await wait(5_000);

		// editReply는 응답을 다시 바꾸는 것이다.
		// await interaction.editReply({ content: 'Secret Pong!', ephemeral: true });

		// 응답 삭제하기
		// await interaction.deleteReply();

		// followUp 자기가 했던말에 위에 답변으로 다는 것 (ephemeral: true는 개인에게 만 보이게 하는것)
		await interaction.followUp({ content: 'ㅇㅇ', ephemeral: true })
		const message = await interaction.fetchReply();
		console.log(message);
	},
};