const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('C:/Bot/Bot/config.json');

module.exports = {
    name: 'rolecolor',
    description: 'Sets the color a role.',
    execute(client, message, args) {
        if (message.member.hasPermission("MANAGE_ROLES")) {
            const roleName1 = args.slice(1)
            const roleName2 = roleName1.join(" ")
            const roleName = roleName2.toLowerCase()
            const roleId = message.guild.roles.find(role => role.name.toLowerCase() === roleName);
            const id = roleId.id
            const rlclr = args.slice(0, 1)
            const roleColor = rlclr.join(" ")
            const isOk = /^#[0-9A-F]{6}$/i.test('#' + roleColor)
            console.log(roleColor, isOk)

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
                    .setDescription('You cannot change your own highest role\'s color, contact a higher ranked server staff member to do this.')
                    .setColor(badColor)
                message.channel.send(embed)
            } else if (!isOk) {
                const embed = new RichEmbed()
                    .setTitle('Invalid Hex')
                    .setColor(badColor)
                    .setDescription('That appears to be an invalid hex code.')
                message.channel.send(embed)
            } else {
                message.guild.roles.get(id).setColor(roleColor);
                const embed = new RichEmbed()
                    .setTitle('Added Role')
                    .setColor(roleColor)
                    .setDescription(`Successfully set ${roleName}'s color to #${roleColor}`)
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