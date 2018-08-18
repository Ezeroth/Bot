const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor, ownerID } = require('C:/Bot/Bot/config.json');

module.exports = {
    name: 'mega_brain',
    description: 'WHO HAS BIG BRAIN WINS',
    execute(client, message, args) {
        if (message.author.id === ownerID) {
            const brainPower = Math.floor(Math.random() * 1000000000)
            const embed = new RichEmbed()
                .setDescription(`${message.author.tag} has ${brainPower} brain powers`)
                .setColor(goodColor)
                .setImage('https://i.imgur.com/KWnGzEv.png')
            message.channel.send(embed)
        } else {
            const brainPower = Math.floor(Math.random() * 1000)
            const embed = new RichEmbed()
                .setDescription(`${message.author.tag} has ${brainPower} brain powers`)
                .setColor(goodColor)
                .setImage('https://i.imgur.com/fBZAkdn.png')
            message.channel.send(embed)
        }
    },
};