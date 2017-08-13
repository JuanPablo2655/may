exports.run = async(client, msg, args) => {
  let pingMsg = await msg.channel.send('Pinging...');
  pingMsg.edit(`so fast! took ${pingMsg.createdTimestamp - msg.createdTimestamp}ms`)
  embedMessage.advanced({
    fields : [field1 = {
        title : "Test",
        content: "test"
      },
      field2 = {
        title: "test2",
        content :"TEST2"
      }
    ],
    thumbnail: client.user.displayAvatarURL,
    desc : "This is a description",
    footer: "This is a footer"
  })
};

exports.help = {
    category   : 'util',
    usage      : 'The command takes no arguments',
    description: 'I will reply with pong fast as possible',
    detail     : 'When using ping the bot will display you the response time in ms',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : ['SEND_MESSAGES'],
    alias      : [
        null
    ]
};
