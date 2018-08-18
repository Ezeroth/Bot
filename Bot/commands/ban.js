const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('C:/Bot/Bot/config.json');

module.exports = {
    name: 'ban',
    description: 'Bans the mentioned user from the server it\'s ran in.',
    execute(client, message, args) {
        if (message.member.hasPermission('BAN_MEMBERS') && message.guild.me.hasPermission("BAN_MEMBERS")) {
            const user = message.mentions.members.first();
            if (user.bannable) {
                message.guild.ban(user.id)
                    .then(user => console.log(`Banned ${user.username || user.id || user} from ${message.guild}`))
                    .catch(console.error);
                const embed = new RichEmbed()
                    .setTitle(`User Successfully banned from ${message.guild.name} server.`)
                    .setColor(goodColor)
                    .setDescription(`Discord tag: ${user.displayName}\n\nDiscord User Id: ${user.id}\n\nUser Mention: <@${user.id}>`)
                message.channel.send(embed);
            } else if (!user.bannable) {
                const embed = new RichEmbed()
                    .setTitle('Ban Failed')
                    .setColor(badColor)
                    .setDescription(`I can not ban that user.`)
                message.channel.send(embed);
            } 
        }
    }
}