const { Client, RichEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Gives you the link to invite the bot to a server.',
    execute(message, args) {
        const embed = new RichEmbed()
            .setDescription('You can invite me using [this link](https://discordapp.com/oauth2/authorize?client_id=478677061607620609&permissions=8&scope=bot)')
        message.channel.send(embed)
    },
};