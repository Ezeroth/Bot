const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor } = require('./config.json');
fs = require('fs');

const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./${file}`);
    client.commands.set(command.name, command);
}

module.exports = {
    name: 'commands',
    description: 'Returns a list with all the commands.',
    execute(client, message, args) {
        fs.readdir('./', (err, files) => {

            const commands = command

            const description =
                files.forEach(function (file) {
                    commands.name += file + '\n';
                });
            const embed = new RichEmbed()
                .setTitle('All Commands')
                .setColor(goodColor)
                .setDescription(description)
            message.channel.send(embed);
        });
    },
};