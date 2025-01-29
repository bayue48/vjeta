import { useQueue, useTimeline } from 'discord-player';
import { Command } from '../../types';

const pause: Command = {
    enable: true,
    name: "pause",
    description: "Pause the music",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply('This server has no queue!');

        if (!queue.isPlaying()) return message.reply('No song is currently playing!');

        // Get the queue's timeline
        const timeline = useTimeline();
        if (!timeline) return message.reply('No song is currently playing!');

        const wasPaused = timeline.paused;
        wasPaused ? timeline.resume() : timeline.pause();

        return message.reply(`**${wasPaused ? 'Resumed' : 'Paused'}** the music!`);
    }
}

export default pause;