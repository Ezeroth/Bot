const RichEmbed = require('discord.js');
const { goodColor, badColor } = require('./config.json');

module.exports = {
    name: 'embed',
    description: 'Makes the bot output what you tell it to.',
    execute(client, message, args) {
        const input = args.join()
        const embed = new RichEmbed()
            .setDescription(input)
            .setColor(goodColor)
        message.channel.send(embed)
    }
}