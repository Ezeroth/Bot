const Client = require('discord.js');
const RichEmbed = require('discord.js');
const { goodColor, badColor } = require('C:/Bot/Bot/config.json');

module.exports = {
    name: 'unban',
    description: 'Unbans a user from the server where the command is ran, only accepts user id.',
    execute(client, message, args) {
        const u = args[0]
        if (!message.member.hasPermissions("BAN_MEMBERS")) {
            const embed = new RichEmbed()
                .setTitle('Missing Permissions')
                .setDescription('You need the BAN_MEMBERS permission to use this command.')
                .setColor(badColor)
            message.channel.send(embed)
        } else if (!message.guild.me.hasPermissions("BAN_MEMBERS")) {
            const embed = new RichEmbed()
                .setTitle('Missing Permissions')
                .setDescription('I need to have the BAN_MEMBERS permission for this command to function properly.')
                .setColor(badColor)
            message.channel.send(embed)
        } else if (!message.guild.fetchBans().then(bans => bans.has(u))) {
            const embed = new RichEmbed()
                .setTitle('Not a user')
                .setDescription('I could not find the user')
                .setColor(badColor)
            message.channel.send(embed)
        } else if (message.member.hasPermissions("BAN_MEMBERS") && message.guild.me.hasPermissions("BAN_MEMBERS")) {
            message.guild.unban(u)
            const embed = new RichEmbed()
                .setTitle(`User ${u.displayName} has been unbanned.`)
                .setDescription(`User: ${u.displayName}\n\nID: ${u}`)
                .setColor(goodColor)
            message.channel.send(embed)
        } else  {
            const embed = new RichEmbed()
                .setTitle('Unban Failed')
                .setDescription('There was an unknown error with unbanning the user.')
                .setColor(badColor)
            message.channel.send(embed)
        }
    }
}