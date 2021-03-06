const { Client, RichEmbed } = require('discord.js');
const badColor = require('./config.json')

module.exports = {
    name: 'prune',
    description: 'Deletes x amount of messages in the channel where it is executed.',
    execute(client, message, args) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
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
            };
        } else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const embed = new RichEmbed()
                .setTitle('Missing Permissions')
                .setColor(badColor)
                .setDescription('You need the MANAGE_MESSAGES permission to use this command.')
            message.channel.send(embed)
        }
    }
};