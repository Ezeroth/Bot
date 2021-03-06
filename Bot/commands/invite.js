const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('./config.json');

module.exports = {
    name: 'invite',
    description: 'Gives you the link to invite the bot to a server.',
    execute(client, message, args) {
        const embed = new RichEmbed()
            .setDescription('You can invite me using [this link](https://discordapp.com/oauth2/authorize?client_id=478677061607620609&permissions=8&scope=bot)')
            .setColor(goodColor)
        message.channel.send(embed)
    },
};