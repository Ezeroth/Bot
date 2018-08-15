const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');


const sendSuccessEmbed = (title, description) => {
    client.on('message', message => {
        const embed = new RichEmbed()
            .setTitle(title)
            .setColor(0xFF0000)
            .setDescription(description);
        message.channel.send(embed);
    })
};


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;

        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
    } else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
});

client.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong.')
    }
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});


client.login(config.token);