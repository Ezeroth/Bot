module.exports = {
    name: 'say',
    description: 'Makes the bot output what you tell it to.',
    execute(client, message, args) {
        const input = args.join()
        message.channel.send(input)
    }
}