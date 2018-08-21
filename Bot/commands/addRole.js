                message.channel.send(embed)
            }
        } else {
            const embed = new RichEmbed()
                .setTitle('Missing Permissions')
                .setDescription('You need the MANAGE_ROLES permission to use this command.')
                .setColor(badColor)
            message.channel.send(embed)
        }
    }
}