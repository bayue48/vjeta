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
            `**Now Playing:** ${currentTrack?.title} - ${currentTrack?.author}`,
            '',
            queue.tracks.size ? '**Upcoming Tracks:**' : 'There are no upcoming tracks',
            ...upcomingTracks.map(
                (track, index) => `${index + 1}. ${track.title} - ${track.author}`,
            ),
            queue.tracks.size ? `**Queue Size:** ${queue.tracks.size}` : '**JETAAA**',
        ].join('\n');

        return message.reply(embedBuilder({
            description: build
        }));
    }
}

export default queue;