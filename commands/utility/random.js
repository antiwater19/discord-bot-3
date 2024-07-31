const { SlashCommandBuilder } = require('discord.js');

function generator() {
    return Math.floor(Math.random() * 10);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('0부터 9까지 숫자를 뽑는거임'),
    async execute(interaction) {

        await interaction.reply(`뽑으신 숫자는 ${generator()}입니다.`);
    },
};