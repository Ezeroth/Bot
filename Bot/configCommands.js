const Discord = require('discord.js');
const { prefix, token } = require('C:/Bot/Bot/betaConfig.json');
const { Client, RichEmbed } = require('discord.js');

const client = new Discord.Client();


client.on('message', message => {
    if (message.content === `${prefix}setname`) {
        if (message.author.id === '348164462672347142') {
            const username = args[0];
            client.user.setUsername(username);
            console.log(client.user)

            const embed = new RichEmbed()
                .setDescription(`Username successfully changed to ${username}`)
                .setColor(0xFF0000)
        }
    }
});