const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('./config.json');

module.exports = {
    name: 'avatar',
    description: 'Returns the avatar of the user running the command if ran without parameters. If ran with mentions, it will display the avatar of all mentioned users.',
    execute(client, message, args) {
        if (!message.mentions.users.size) {
            const embed = new RichEmbed()
                .setTitle('Your avatar')
                .setColor(goodColor)
                .setDescription(`(Your avatar){${message.author.displayAvatarURL}}`)
                .setImage(message.author.displayAvatarURL)
            message.channel.send(embed);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });


        message.channel.send(avatarList);
    },
};