const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('C:/Bot/Bot/config.json');

module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server.',
    execute(client, message, args) {
        const created = message.guild.createdAt
        const icon = message.guild.iconURL
        const owner = message.guild.owner.user.tag
        const id = message.guild.id
        const members = message.guild.members.size
        const channels = message.guild.channels.size
        const roles = message.guild.roles.size
        const name = message.guild.name

        const embed = new RichEmbed()
            .setTitle(`Server Info for ${name}`)
            .addField('Server Creation Date', created, true)
            .addField('Owner', owner, true)
            .addField('Server ID', id, true)
            .addField('Member Count', members, true)
            .addField('Channel Count', channels, true)
            .addField('Role Count', roles, true)
            .setImage(icon)
            .setColor(goodColor)
        message.channel.send(embed)
    },
};