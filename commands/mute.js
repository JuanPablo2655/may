exports.run = async(client, msg, args) => {
  const ms = require('ms')
  /**
  * @var {target} @type {Object} user-Object to mute
  * @var {dole} @type {Object} role-Object for mutes
  * @var {reason} @type {String} Punishment-Reason
  * @var {duration} @type {String} Punishment-Duration
  */
  const target = msg.mentions.users.first();
  const role = msg.guild.roles.find('name', 'may-muted');
  const reason = msg.content.split(' ').slice(3).join(' ');
  const duration = msg.content.split(' ')[2];
  const mayLog = msg.guild.channels.find('name', 'may-log');

  let Freason;
  if (!reason) {
    Freason = 'None'
  } else {
    Freason = reason;
  }

  let Fdur;
  if (duration === 'permant') {
    Fdur = 'permant'
  } else {
    Fdur = duration;
  }

  let finallTime;
  if (Fdur === 'permant') {
    finallTime = 'permanent'
  } else {
    finallTime = ms(ms(Fdur), {long : true});
  }

  if (!target) {
    return msg.reply('Please mention a user for the punishment')
  }

  if (!mayLog) {
    embedMessage.advanced({
      author    : {
        name    : `Muted ${target.username}`,
        pic     : client.user.avatarURL
      },
      desc      : `\`\`\`\n
Target   : ${target.username} [${target.id}]\n\
Moderator: ${msg.author.username} [${msg.author.id}]\n\
Duration : ${ms(ms(finallTime))}\n\
Reason   : ${Freason}
\`\`\``,
      color     : 0x6580b0
    })

  } else if (mayLog) {
    const embed = require('')
  }
};

exports.help = {
    category   : 'moderation',
    usage      : '[time:time or permant] [reason:optional]',
    description: 'I will be sure to shut their mouth',
    detail     : 'When using mute the bot will mute the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'MANAGE_ROLES'],
    authorPerm : ['SEND_MESSAGES', 'MUTE_MEMBERS'],
    alias      : [
        null
    ]
};
