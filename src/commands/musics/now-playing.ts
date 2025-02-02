import { usePlayer, useQueue } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';

const nowPlaying: Command = {
    enable: true,
    name: "now-playing",
    description: "Show now playing song",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));

        const track = queue?.currentTrack;
        if (!track) return message.reply(embedBuilder({
            description: constants.noSong
        }));

        const player = usePlayer();
        const progressBar = player?.createProgressBar();
        const timestamp = player?.getTimestamp();
  
        return message.reply(embedBuilder({
            thumbnail: track.thumbnail,
            url: track.url,
            fields: [
                {
                    name: 'Author',
                    value: track.author,
                    inline: true,
                },
                {
                    name: 'Title',
                    value: track.title,
                    inline: true,
                },
                {
                    name: 'Duration',
                    value: `${timestamp?.total}`,
                    inline: true,
                },
                {
                    name: 'Progress',
                    value: `${progressBar}`,
                    inline: true,
                },
            ],
        }));
    }
}

export default nowPlaying;