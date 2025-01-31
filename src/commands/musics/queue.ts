import { useQueue } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../functions';

const queue: Command = {
    enable: true,
    name: "queue",
    description: "Show queue",
    execute: async (message, args) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));

        const currentTrack = queue.currentTrack
        const upcomingTracks = queue.tracks

        const build = [
            `**Queue Size:** ${queue.tracks.size}`,
            `**Now Playing:** ${currentTrack?.title} - ${currentTrack?.author}`,
            '',
            '**Upcoming Tracks:**',
            ...upcomingTracks.map(
                (track, index) => `${index + 1}. ${track.title} - ${track.author}`,
            ),
        ].join('\n');

        return message.reply(embedBuilder({
            description: build
        }));
    }
}

export default queue;