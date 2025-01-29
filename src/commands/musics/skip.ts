import { useQueue } from 'discord-player';
import { Command } from '../../types';

const skip: Command = {
    enable: true,
    name: "skip",
    description: "Skip the current song",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply('This server has no queue!');

        if (!queue.isPlaying()) return message.reply('No song is currently playing!');

        queue.node.skip();

        return message.reply('Skipped the current song!');
    }
}

export default skip;