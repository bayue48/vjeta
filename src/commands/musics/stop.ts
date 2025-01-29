import { useQueue } from 'discord-player';
import { Command } from '../../types';

const previous: Command = {
    enable: true,
    name: "previous",
    description: "Play previous song",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply('This server has no queue!');

        queue.delete();
        return message.reply('Stopped the music!');
    }
}

export default previous;