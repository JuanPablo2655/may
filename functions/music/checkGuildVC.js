// const play = require('./playMusic.js');
async function checkGuildVC(client, msg) {
  if (!msg.guild.voiceConnection) {
    msg.member.voiceChannel.join()
      .then(async connection => {
        logger.info(`Started to stream ${msg.author.username}`);
        await playMusic(connection, msg);
    });
  }
}

module.exports = checkGuildVC;
