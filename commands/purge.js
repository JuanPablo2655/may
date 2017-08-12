exports.run = async(client, msg, args) => {
  let amount = msg.content.split(' ')[1]
  let actualAmountInt = parseInt(amount) + 1;

  if (!amount) {
    return msg.channel.send('Please specify amount of messages to delete.');
  }

  // if (typeof amount !== 'number') {
  //     return msg.channel.send('Amount has to be a number.')
  // }

  if (actualAmountInt > 99) {
    return msg.channel.send('The max I can delete are 100 messages at once')
  }

  msg.channel.fetchMessages({
    limit: actualAmountInt
  }).then(r => {
    r.map(o => o.channel.bulkDelete(actualAmountInt))
    logger.info(`Deleted ${actualAmountInt - 1} messages inside ${r.map(o => o.channel.name)[0]}`)
  })
};

exports.help = {
    category   : 'util',
    usage      : 'The command takes no arguments',
    description: 'I will reply with pong fast as possible',
    detail     : 'When using ping the bot will display you the response time in ms',
    botPerm    : ['MANAGE_MESSAGES', "SEND_MESSAGES"],
    authorPerm : ['MANAGE_MESSAGES', "SEND_MESSAGES"],
    alias      : [
        'pur'
    ]
};