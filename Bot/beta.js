const fs = require('fs');
const Discord = require('discord.js');
const { prefix, ownerID, token } = require('C:/Bot/Bot/betaConfig.json');
const { goodColor, badColor } = require('C:/Bot/Bot/config.json');
const { Client, RichEmbed } = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

function clean(text) {
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
        message.channel.send(embed)
    }
});
 
client.on("message", message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const helpCommandName = args

    if (message.content.startsWith(prefix + "help")) {
        if (!message.author.bot) {
            if (!helpCommandName) {
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
                    .setColor(badColor)
                message.channel.send(embed);
            }
        }
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