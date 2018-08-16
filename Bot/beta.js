const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('C:/Bot/Bot/betaConfig.json');
const { Client, RichEmbed } = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        const embed = new RichEmbed()
            .setTitle('Command Failed')
            .setDescription(`Command ${commandName} failed. Please check that you are using it correctly and try again.`)
            .setColor(0xFF0000)
        message.reply(embed);
    }
});

client.login(token);