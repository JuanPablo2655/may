const Discord = require('discord.js');
exports.run = (client, msg, args) => {
  const embedClass  = require('../classes/embedMessage.js');
  let embedMessage = new embedClass(msg);
  /**
  * @var {target} @type {Object} user-Object to mute
  * @var {reason} @type {String} Punishment-Reason
  * @var {mayLog} @type {Object} Punishment-channel
  */
  const target = msg.mentions.users.first();
  const reason = msg.content.split(' ').slice(2).join(' ');
  const mayLog = msg.guild.channels.find('name', 'may-log');

  let Freason;
  if (!reason) {
    Freason = 'None'
  } else {
    Freason = reason;
  }

  if (!target) {
    return msg.channel.send('Please mention someone.')
  }

  /**
  * Check if the user can be kicked by the bot
  * @param {Object} target the mentioned user Object
  * @class {embedMessage}
  * @param {String} type type of the embed
  * @param {String} content the content of the message
  */
  if (msg.guild.member(target).kickable === false) {
    return embedMessage.descEmbed({
      type : "desc",
      content : `🔒 Cannot kick\n**Reason:** Privilege is too low`,
      color   : 0x6e1c39
    })
  }

  const embed = new Discord.RichEmbed()
  .setAuthor(`Muted ${target.username}`, client.user.avatarURL)
  .setDescription(`\`\`\`\n
Target   : ${target.username} [${target.id}]\n\
Moderator: ${msg.author.username} [${msg.author.id}]\n\
Reason   : ${Freason}
\`\`\``)
  .setColor(0x6e1c39);

  /**
  * Send the message to the channel where the message was sent in or to mayLog
  * @param {Obejct} embed The embed object from above
  * @returns {Promise}
  * @returns {Error}
  */
  if (!mayLog) {
    msg.channel.send({embed})
      .catch(e => logger.error(e))

  } else if (mayLog) {
    mayLog.send({embed})
  }

  /**
  * Kick the target
  * @param {String} reason The reason to the audits
  * @param {Object} target the mentioned user object
  * @returns {Promise}
  * @returns {Error}
  */
  msg.guild.member(target).kick({
    reason: reason + ` => Kicked by ${msg.author.tag}`
  })
    .catch(e => logger.error(e))

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
