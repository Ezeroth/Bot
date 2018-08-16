const { Client, RichEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans the mentioned user from the server it\'s ran in',
    execute(client, message, args) {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            const user = message.mentions.users.first();
            if (!user) {
                const embed = new RichEmbed()
                    .setTitle('Ban Failed')
                    .setColor(0xFF0000)
                    .setDescription(`I could not find any users.`)
                message.channel.send(embed);
            } else {
                message.guild.ban(user.id)
                    .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild}`))
                    .catch(console.error);
                const embed = new RichEmbed()
                    .setTitle('User Successfully Banned')
                    .setColor(0xFF0000)
                    .setDescription(`User ${user.tag} was successfully banned from ${message.guild.name}`)
                message.channel.send(embed);
            }
        }
    }
}



            
    
/*
    if(command === "!!ban") {

    if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.reply("Insufficient Permission.");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("An error occured");
    if(!member.bannable)
      return message.reply("Uhhh.. You can't ban your manager.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Failure to comply with rules";

    await member.ban(reason)
      .catch(error => message.reply(`I was unable to ban ${member.user.tag}. Details: ${error}`));
      Member.send(`You were banned from The Community Hub, ${reason}`)
    message.reply(`_**${member.user.tag} was banned**_`);
  }
*/