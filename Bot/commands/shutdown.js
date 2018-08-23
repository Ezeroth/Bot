const { Discord, Client, RichEmbed } = require('discord.js')
const goodColor = require('./config.json')


module.exports = {
    name: 'shutdown',
    description: 'Makes the bot shut down.',
    execute(client, message, args) {
        const embed = new RichEmbed()
            .setDescription('Shutting down')
            .setColor(0xFF0000)
        message.channel.send(embed)
        client.destroy()
    }
}
