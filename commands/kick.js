const Discord = require('discord.js');
exports.run = (client, msg, args) => {

    const toBanUsr = msg.mentions.users.last() === client.user ? msg.mentions.users.first() : msg.mentions.users.last();
    const role = msg.guild.roles.find('name', 'may-muted');

    let reason;
    if (!args[1]){
        reason = 'None'
    } else {
        reason = args.slice(1).join(' ');
    }

    if (toBanUsr === client.user || !toBanUsr) {
        return msg.reply('Please mention someone.')
    }

    const mayLog = msg.guild.channels.find('name', 'may-log');

    if (msg.guild.member(toBanUsr).kickable === false) {
        return embedMessage.descEmbed({
            type : "desc",
            content : `🔒 Cannot kick\n**Reason:** Privilege is too low`,
            color   : 0x6e1c39
        })
    }

    const embed = new Discord.RichEmbed()
        .setColor(0xc65e57)
        .setAuthor('Kicked ' + toBanUsr.tag, client.user.avatarURL)
        .setDescription(`Kicked User: \`${toBanUsr.tag} (${toBanUsr.id})\`\nKicked by: \`${msg.author.tag} (${msg.author.id})\`\nReason: \`${reason}\``)
        .setTimestamp();

    mayLog ? mayLog.send({embed}) : msg.channel.send({embed});

    msg.guild.member(toBanUsr).kick(reason + ` => Kicked by ${msg.author.tag}`).catch(e => logger.error(e))

    // TODO: add total kicks the user got to a database

};

exports.help = {
    category   : 'moderation',
    usage      : '',
    description: 'Kicks a memember',
    detail     : `Kick a mentioned user and get him out of the server`,
    botPerm    : ['SEND_MESSAGES', "KICK_MEMBERS"],
    authorPerm : ["KICK_MEMBERS"],
    alias      : [
        null
    ]
};
