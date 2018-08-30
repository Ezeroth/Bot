const fs = require('fs');
const Discord = require('discord.js');
const { prefix, ownerID, token } = require('./commands/config.json');
const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('./commands/config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(client, message, args);
    }
    catch (error) {
        console.error(error);
        const embed = new RichEmbed()
            .setTitle('Command Failed')
            .setDescription(`${message.author.tag}, command ${commandName} failed. Please check that you are using it correctly and try again.`)
            .setColor(badColor)
        message.reply(embed);
    }
    
    console.log(`Command ${commandName} Ran\nUser: ${message.author.tag}\nChannel: ${message.channel.id}\nGuild: ${message.guild.id}\nContent: ${message.content}\n`)
});

client.on("message", message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const helpCommandName = args

    if (message.content.startsWith(prefix + "help")) {
        if (!message.author.bot) {
            if (message.channel.type === 'text') {
                if (!args[0]) {
                    const serverName = message.guild.name
                    const ping = client.ping
                    const serverCount = client.guilds.size
                    const channelCount = client.channels.size
                    const userCount = client.users.size
                    const botAv = client.user.displayAvatarURL
                    const version = require('./commands/config.json')

                    const embed = new RichEmbed()
                        .setTitle(`Ravea Bot v${version}`)
                        .setColor(goodColor)
                        .addField('About', 'I am a general purpose discord bot that was created by Eze#8999. I am currently in my early testing stages, however I should be fully usable by the end of the month supposing I face no major issues. If you\'d like to have a commmand added, feel free to DM Eze#8999 or join the support server(linked at the bottom)')
                        .addField('Bot ID', '478677061607620609')
                        .addField('Server Name', serverName)
                        .addField('Presence', `${serverCount} servers.\n${channelCount} channels.\n${userCount} users.`)
                        .addField('Links', '[Support Server](https://discord.gg/wQ78Bg6)\n[Invite Me To Your Server](https://discordapp.com/oauth2/authorize?client_id=478677061607620609&permissions=8&scope=bot)')
                        .setThumbnail(botAv)
                    message.channel.send(embed)
                } else
                    try {
                        const helpString = require(`C:/Bot/Bot/commands/${helpCommandName}.js`);

                        const embed = new RichEmbed()
                            .setColor(goodColor)
                            .setTitle(`Help string for ${helpCommandName}.`)
                            .setDescription(helpString.description)
                        message.channel.send(embed)
                    }
                    catch (error) {
                        console.error(error);
                        const embed = new RichEmbed()
                            .setTitle('Unknown Command')
                            .setDescription(`I couldn't find that command.`)
                            .setColor(badColor)
                        message.channel.send(embed);
                    }
            }
        }
    }
})


client.on("message", message => {
    const args = message.content.split(" ").slice(1);

    if (message.content.startsWith(prefix + "eval")) {
        if (message.author.id === '348164462672347142')
            try {
                const code = args.join(" ");
                let evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);

                message.channel.send(clean(evaled), { code: "xl" });
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
    }
});

client.login(token);