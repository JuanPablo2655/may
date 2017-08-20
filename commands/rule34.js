const cooldown = require('../functions/cooldown.js');
const snekfetch = require('snekfetch');
const xml2js = require('xml2js');
// TODO: Beautify a bit
// TODO: Add database check if channel is nsfw also make a make channel nsfw command
exports.run = async(client, msg, args) => {
    if (cooldown(msg, 'rule34', 60, 'This command has a cooldown of **1 Minute**!')) {
        if (!args[0]) return msg.channel.send("Please give a search terms!");
        snekfetch.get('http://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + args.join(' ')).then(r => {
            if (r.body.length < 75) return msg.channel.send(":x: Nothing found!");
            xml2js.parseString(r.body, (err, reply) => {
                if (err) {
                    return msg.channel.send('The API returned an unconventional response. :thinking:')
                } else {
                    let count = Math.floor((Math.random() * reply.posts.post.length));
                    msg.channel.send({files: [reply.posts.post[count].$.file_url]}).catch(logger.error);
                }
            })
        })
    }
};
// TODO: Add real stuff to the help I am too lazy rn
exports.help = {
    category   : 'fun',
    usage      : false,
    description: 'I will reply with pong fast as possible',
    detail     : 'When using ping the bot will display you the response time in ms',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        'r34'
    ]
};
