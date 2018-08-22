const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor, version } = require('./config.json');

module.exports = {
    name: 'stats',
    description: 'Displays information and stats about the bot',
    execute(client, message, args) {
        const serverName = message.guild.name
        const ping = client.ping
        const serverCount = client.guilds.size
        const channelCount = client.channels.size
        const userCount = client.users.size
        const botAv = client.user.displayAvatarURL

        const embed = new RichEmbed()
            .setTitle('Bot Information')
            .setColor(goodColor)
            .addField('About', 'I am a general purpose discord bot that was created by Eze#8999. I am currently in my early testing stages, however I should be fully usable by the end of the month supposing I face no major issues. If you\'d like to have a commmand added, feel free to DM Eze#8999 or join the support server(linked at the bottom)')
            .addField('Bot ID', '478677061607620609')
            .addField('Server Name', serverName)
            .addField('Presence', `${serverCount} servers.\n${channelCount} channels.\n${userCount} users.`)
            .addField('Links', '[Donate On Patreon](https://patreon.com/EzeDiscordBot)\n[Donate On PayPal](https://paypal.me/ShareefOkeefe)\n[Support Server](https://discord.gg/wQ78Bg6)\n[Invite Me To Your Server](https://discordapp.com/oauth2/authorize?client_id=478677061607620609&permissions=8&scope=bot)')
            .setThumbnail(botAv)
        message.channel.send(embed)
    },
};