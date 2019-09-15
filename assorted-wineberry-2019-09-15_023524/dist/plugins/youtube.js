"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl = require("ytdl-core");
const bot_1 = require("../bot");
const youtubeType = 'youtube';
class YoutubePlugin {
    preInitialize(bot) {
        bot.helptext += '\n`youtube [url/idfragment]` - Add youtube audio to the queue\n';
        const player = bot.player;
        bot.commands.on(youtubeType, (cmd, msg) => {
            if (cmd.arguments.length > 0) {
                cmd.arguments.forEach(arg => {
                    player.addMedia({ type: youtubeType, url: arg, requestor: msg.author.username });
                });
            }
        });
        player.typeRegistry.set(youtubeType, {
            getDetails: (item) => new Promise((done, error) => {
                item.url = item.url.includes('://') ? item.url : `https://www.youtube.com/watch?v=${item.url}`;
                let result = ytdl.getInfo(item.url, (err, info) => {
                    if (info) {
                        item.name = info.title ? info.title : 'Unknown';
                        item.duration = bot_1.secondsToTimestamp(parseInt(info.length_seconds) || 0);
                        done(item);
                    }
                    else
                        error(err);
                });
            }),
            getStream: (item) => new Promise((done, error) => {
                let stream = ytdl(item.url, { filter: 'audioonly' });
                if (stream)
                    done(stream);
                else
                    error('Unable to get media stream');
            })
        });
    }
    postInitialize(bot) {
    }
}
exports.default = YoutubePlugin;
//# sourceMappingURL=youtube.js.map