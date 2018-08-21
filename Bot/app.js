const fs = require('fs');
const Discord = require('discord.js');
const { prefix, ownerID, token } = require('C:/Bot/Bot/config.json');
const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('C:/Bot/Bot/config.json');

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
            .setColor(0xFF0000)
        message.reply(embed);
    }
});

client.on("message", message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const helpCommandName = args

    if (message.content.startsWith(prefix + "help")) {
        if (!message.author.bot) {
            if (helpCommandName === null) {
                const embed = new RichEmbed()
                    .setDescription('YELL AT EZE TO MAKE HELP STRING')
                    .setColor(goodColor)
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
                        .setColor(0xFF0000)
                    message.channel.send(embed);
                }
        }
    }
})

client.on("message", message => {
    if (message.guild.id === '446804554248355842' && message.content.startsWith("member")) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const icon = message.guild.iconURL

            message.mentions.members.first().addRole('448980272344727582')
            const embed = new RichEmbed()
                .setDescription(`Welcome ${message.mentions.users.first()} to the Heavens Wrath King's Raid guild. If you have any questions or are ever in need of advice, feel free to ask in <#446804554827431937>! `)
                .setColor(0x15D6EF)
                .setImage(icon)

            message.channel.send(embed)
        } else {
            message.channel.send('This is an officer only command.')
        }
    }
})

client.on("message", message => {
    const role = '479603451006025729'

    if (message.channel.id === '478679577175261185' && message.content === 'agree') {
        message.member.addRole(role)
        const embed = new RichEmbed()
            .setDescription('Successfully Added Aquanatics Role')
            .setColor(goodColor)
    }
})

client.on("message", message => {
    const args = message.content.split(" ").slice(1);

    if (message.content.startsWith(prefix + "eval")) {
        if (message.author.id === ownerID)
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