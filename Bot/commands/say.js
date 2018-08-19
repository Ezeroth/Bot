
module.exports = {
    name: 'say',
    description: 'Makes the bot output what you tell it to.',
    execute(client, message, args) {
        const input = args.join(" ");
        const text = input.replace("@everyone", "@​everyone");
        const finalText = text.replace("@here", "@​here");

        message.channel.send(finalText)
    }
}