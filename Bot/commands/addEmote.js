const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('C:/Bot/Bot/config.json');
const isURL = require('isurl');

module.exports = {
    name: 'addemote',
    description: 'Adds an emoji to the server where the command is ran.',
    execute(client, message, args) {
        const emoteName = args[0]
        const emoteURL = args[1]
        const emoteSize = emoteURL.size

        if (message.member.hasPermission("MANAGE_EMOJIS")) { message.guild.createEmoji(emoteURL, emoteName)
                const embed = new RichEmbed()
                    .setTitle('Emote Successfully Added')
                    .setDescription(`Emote ${emoteName} successfully added!`)
                    .setColor(goodColor)
                message.channel.send(embed)
            } else {
            const embed = new RichEmbed()
                .setTitle('Missing Permissions')
                .setDescription('You need the MANAGE_EMOJIS permission to use this command.')
                .setColor(badColor)
            message.channel.send(embed)
        }

    },
};

/*
        if (message.member.hasPermission('MANAGE_EMOJIS')) {
            if (!isURL(emoteURL)) {
                console.log('is url')
                const embed = new RichEmbed()
                    .setTitle('Invalid URL')
                    .setColor(goodColor)
                    .setDescription('That URL appears to be invalid. Please ensure it is a functioning direct image link and try again.')
                message.channel.send(embed)
            } else if (emoteSize < 256000) {
                console.log('fits size')
                const embed = new RichEmbed()
                    .setTitle('File Too Large')
                    .setColor(goodColor)
                    .setDescription(`Your file was ${emoteSize} bytes, you can try and crop it or reduce the size. It needs to be equal to or lesser than 256000 bytes for the emote to be added.`)
                message.channel.send(embed)
            }
*/