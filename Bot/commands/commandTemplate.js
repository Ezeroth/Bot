const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('./config.json');

module.exports = {
    name: 'COMMANDNAME',
    description: 'COMMANDDESCRIPTION',
    execute(client, message, args) {
        console.log('this is the template')
    },
};