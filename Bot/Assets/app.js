const Discord = require('discord.js');
const { prefix, token } = require('C:/Bot/Bot/config.json');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');

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
    } else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            const embed = new RichEmbed()
                .setTitle('Your avatar')
                .setColor(0xFF0000)
                .setDescription(`URL: Your avatar: ${message.author.displayAvatarURL}`)
                .setImage(message.author.displayAvatarURL)
            message.channel.send(embed);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });


        message.channel.send(avatarList);
    } else if (command === 'invite') {
        const embed = new RichEmbed()
            .setDescription('You can invite me using [this link](https://discordapp.com/oauth2/authorize?client_id=478677061607620609&permissions=8&scope=bot)')
        message.channel.send(embed)
    } else if (command === 'prune') {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        }
        else if (amount < 1 || amount > 100) {
            return message.reply('You need to input a number under 100.');
        }
        else if (amount > 1 || amount < 100) {
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('there was an error trying to prune messages in this channel!');
            });
        }
    }
});

client.login(token);