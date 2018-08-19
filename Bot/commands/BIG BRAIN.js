const { Client, RichEmbed } = require('discord.js');
const { goodColor, badColor, ownerID } = require('C:/Bot/Bot/config.json');

module.exports = {
    name: 'mega_brain',
    description: 'WHO HAS BIG BRAIN WINS',
    execute(client, message, args) {

        const brainPower = Math.floor(Math.random() * 1000)
        let brainImageGen = Math.floor(brainPower / 100)
        let brainImage = 'https://i.imgur.com/WCIRn2d.png'
        switch (brainImageGen) {
            case 0:
                brainImage = "https://i.imgur.com/cb47Olf.png";
                break;
            case 1:
                brainImage = "https://i.imgur.com/OxvCSG9.png";
                break;
            case 2:
                brainImage = "https://i.imgur.com/gNsvZeM.png";
                break;
            case 3:
                brainImage = "https://i.imgur.com/4XqJPCp.png";
                break;
            case 4:
                brainImage = "https://i.imgur.com/Wo9Y1N5.png";
                break;
            case 5:
                brainImage = "https://i.imgur.com/Puc5CE2.png";
                break;
            case 6:
                brainImage = "https://i.imgur.com/TWUtqQw.png";
                break;
            case 7:
                brainImage = "https://i.imgur.com/pmN1uTt.png";
                break;
            case 8:
                brainImage = "https://i.imgur.com/UzPcFuo.png";
                break;
            case 9:
                brainImage = "https://i.imgur.com/XZdiGVl.jpg";
                break;
            case 10:
                brainImage = "https://i.imgur.com/WCIRn2d.png";
                break;
        }


        if (!args) {
            const embed = new RichEmbed()
                .setDescription(`${message.author.tag} has ${brainPower} brain powers`)
                .setColor(goodColor)
                .setImage(brainImage)
            message.channel.send(embed)
        } else if (message.mentions.members) {
            const brained = message.mentions.members;
            const embed = new RichEmbed()
                .setDescription(`${message.author.tag} has ${brainPower} brain powers`)
                .setColor(goodColor)
                .setImage(brainImage)
            message.channel.send(embed)
        }
    }
};
