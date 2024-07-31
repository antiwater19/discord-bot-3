const fs = require('node:fs');
const path = require('node:path');
const express = require("express");
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// 요거는 config.json의 데이터를 Conco라는 별명으로 가져오는 것이다.
const Conco = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// fs를 이용하여 명령어 폴더 찾는 코드 
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

// 이주석 코드는 각 하위 파일 명이 문자열로 반환되게 하는 코드이다.
//console.log(`${commandFolders}`)

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//---------------------------------------------------------------------
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


//---------------------------------------------------------------------
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// 봇 토큰 인증
client.login(Conco.token);

// nodemon 사용법 npm run dev
