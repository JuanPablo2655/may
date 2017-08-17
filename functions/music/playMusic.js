const ytdl = require('ytdl-core');
const jsonDatabase = require('node-json-db');
const db = new jsonDatabase('./musicQueue/queue.json', true, true);

async function playMusic(connection, msg) {
  db.reload();

  let nextSong = db.getData(`/guilds/${msg.guild.id}/queue`);
  console.log(nextSong);
  dispatcher = connection.playStream(ytdl(nextSong[0], {filter: 'audioonly'}));
  setTimeout(async function () {
    await db.delete(`/guilds/${msg.guild.id}/queue[0]`);
  }, 1000);

  dispatcher.on('end', async () => {
    if (nextSong) {
      try {
        await playMusic(connection, msg);
      } catch (e) {
        logger.error(e);
        db.delete(`/guilds/${msg.guild.id}/queue`);
        connection.disconnect();
      }

    } else {
      console.log(nextSong);
      connection.disconnect();
      db.delete(`/guilds/${msg.guild.id}/queue`);
    }
  });
}

module.exports = playMusic;
