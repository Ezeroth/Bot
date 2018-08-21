const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('C:/Bot/Bot/config.json');

module.exports = {
    name: 'addrole',
    description: 'Adds a role to a mentioned guild member.',
    execute(client, message, args) {
        if (message.member.hasPermission("MANAGE_ROLES")) {
            const roleName1 = args.slice(1)
            const roleName2 = roleName1.join(" ")
            const roleName = roleName2.toLowerCase()
            const roleId = message.guild.roles.find(role => role.name.toLowerCase() === roleName);
            const member = message.mentions.members.first();

            if (roleId === undefined) {
                const embed = new RichEmbed()
                    .setTitle('Unknown Role')
                    .setColor(badColor)
                    .setDescription(`I could not find role "${roleName}", ensure the spelling is correct and try again.`)
                message.channel.send(embed)
            } else if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
                const embed = new RichEmbed()
                    .setTitle('Missing Permissions')
                    .setDescription('I need the MANAGE_ROLES permission for this command to work.')
                    .setColor(badColor)
                message.channel.send(embed)
            } else if (Math.sign(message.guild.roles.get(message.guild.me.highestRole.id).comparePositionTo(roleId)) === -1) {
                const embed = new RichEmbed()
                    .setTitle('Insufficient Role Position')
                    .setDescription('My highest role needs to be above the role to be added for this command to work.')
                    .setColor(badColor)
                message.channel.send(embed)
            } else if (Math.sign(message.guild.roles.get(message.member.highestRole.id).comparePositionTo(roleId) === -1)) {
                const embed = new RichEmbed()
                    .setTitle('Insufficient Role Position')
                    .setDescription('Your highest role needs to be above the role to be added for this command to work.')
                    .setColor(badColor)
                message.channel.send(embed)
            } else if (Math.sign(message.guild.roles.get(message.member.highestRole.id).comparePositionTo(roleId) === 0)) {
                const embed = new RichEmbed()
                    .setTitle('Insufficient Role Position')
                    .setDescription('You cannot assign your own highest role, contact a higher ranked server staff member to do this.')
                    .setColor(badColor)
                message.channel.send(embed)
            } else {
                member.addRole(roleId);
                const embed = new RichEmbed()
                    .setTitle('Added Role')
                    .setColor(goodColor)
                    .setDescription(`Successfully added role ${roleName} to ${member.displayName}`)
                message.channel.send(embed)
            }
        } else {
            const embed = new RichEmbed()
                .setTitle('Missing Permissions')
                .setDescription('You need the MANAGE_ROLES permission to use this command.')
                .setColor(badColor)
            message.channel.send(embed)
        }
    }
}