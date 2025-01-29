import { useQueue } from 'discord-player';
import { Command } from '../../types';

const queue: Command = {
    enable: true,
    name: "queue",
    description: "Show queue",
    execute: async (message, args) => {
        const queue = useQueue();
        if (!queue) return message.reply('This server has no queue!');

        const currentTrack = queue.currentTrack
        const upcomingTracks = queue.tracks

        const build = [
            `**Now Playing:** ${currentTrack?.title} - ${currentTrack?.author}`,
            '',
            '**Upcoming Tracks:**',
            ...upcomingTracks.map(
                (track, index) => `${index + 1}. ${track.title} - ${track.author}`,
            ),
        ].join('\n');

        // Send the message
        return message.reply(build);
    }
}

export default queue;