const { Client, RichEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(client, message, args) {
        message.channel.send('Pong.');
    },
};