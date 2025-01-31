import { useQueue, useMainPlayer } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../functions';

const lyrics: Command = {
    enable: true,
    name: "lyrics",
    description: "Get lyrics of a song",
    execute: async (message, args) => {
        let query = "";
        let link = "";
        let thumbnail = "";

        if (!args[1]) {
            const queue = useQueue()
            if (!queue) return message.reply(embedBuilder({
                description: constants.noQueue
            }));
            if (!queue.isPlaying()) return message.reply(embedBuilder({
                description: constants.noSong
            }))

            query = `${queue?.currentTrack?.author} ${queue?.currentTrack?.title}`
            link = `${queue?.currentTrack?.url}`
            thumbnail = `${queue?.currentTrack?.thumbnail}`
        } else {
            args.shift();
            query = args.join(' ');
        }

        const msg = await message.reply(embedBuilder({
            description: `Please wait, im looking for the Lyrics, It can take \`few \` seconds.`
        }));

        try {
            const player = useMainPlayer();
            const lyrics = await player?.lyrics.search({
                q: query,
            });

            if (!lyrics.length)
                return msg.edit(embedBuilder({
                    description: 'No lyrics found for this song!'
                }));

            const result = lyrics[0].plainLyrics

            // if (result.length > 4095) {
            //     msg.delete();
            //     return msg.edit(embedBuilder({
            //         description: 'Lyrics are too long to be returned as embed'
            //     }));
            // }

            if (result.length < 4095) {
                return msg.edit(embedBuilder({
                    title: `${lyrics[0].name} - ${lyrics[0].artistName}`,
                    description: result,
                    url: link ? link : undefined,
                    thumbnail: thumbnail ? thumbnail : undefined
                }))
            } else {
                msg.edit(embedBuilder({
                    title: `${lyrics[0].name} - ${lyrics[0].artistName}`,
                    description: result.substring(0, 4095),
                    url: link ? link : undefined,
                    thumbnail: thumbnail ? thumbnail : undefined
                }))

                message.reply(embedBuilder({
                    title: `${lyrics[0].name} - ${lyrics[0].artistName}`,
                    description: result.substring(4095, result.length),
                    url: link ? link : undefined,
                    thumbnail: thumbnail ? thumbnail : undefined
                }))
            }
        } catch (e) {
            console.log(e)
            return message.reply(embedBuilder({
                description: constants.err
            }));
        }
    }
}

export default lyrics;
