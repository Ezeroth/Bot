const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor, ownerID } = require('./config.json');

module.exports = {
    name: 'BotInfo',
    description: 'Shows the embedded content of <#479094368096092160>.',
    execute(client, message, args) {
            const embed = new RichEmbed()
                .setTitle('Bot Info')
                .setColor(goodColor)
                .setDescription('Hello everyone and welcome to my support server! Eze is my bot developer and he would love to hear all of your feedback on the bot. It is currently in the alpha testing stages, but it should be ready and usable before the end of the month! If you wanted to help support the bot, feel free to DM me any suggestions or improvements you believe could be made! You can donate to the project [here](https://www.patreon.com/EzeDiscordBot)! Any and all donations and other contributions are more than welcome and would be greatly appreciated!')
            message.channel.send(embed)
    },
};