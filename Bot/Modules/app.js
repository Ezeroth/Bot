const Discord = require('discord.js');
const config = require('C:/Bot/Bot/config.json');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const prefix = config.prefix

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
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    } else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

        message.channel.send(`First argument: ${args[0]}`);
    } else if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            const embed = new RichEmbed()
                .setTitle('Your avatar')
                .setColor(0xFF0000)
                .setDescription(`URL: Your avatar: ${message.author.displayAvatarURL}`)
                .setImage(message.author.displayAvatarURL)
            message.channel.send(embed);
        }
    } else if (command === 'invite') {
        const embed = new RichEmbed()
            .setDescription('You can invite me using [this link](https://discordapp.com/oauth2/authorize?client_id=478677061607620609&scope=bot)')
        message.channel.send(embed)
    }
});

client.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong.')
    }
});

client.login(config.token);