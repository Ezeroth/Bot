const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');

module.exports = {
    name: 'setname',
    description: 'Sets the username for the bot',
    execute(client, message, args) {
        if (message.author.id === '348164462672347142') {
            const username = args;
            client.user.setUsername(username);

            const embed = new RichEmbed()
                .setDescription(`Username successfully changed to ${username}`)
                .setColor(0xFF0000)
        }
    }
}