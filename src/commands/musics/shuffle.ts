import { useQueue } from 'discord-player';
import { Command } from '../../types';

const shuffle: Command = {
    enable: true,
    name: "shuffle",
    description: "Shuffle the queue",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply('This server has no queue!');

        if (queue.tracks.size < 2) return message.reply('There not enough songs in the queue to shuffle!');
        
        queue.tracks.shuffle();

        return message.reply('Shuffled the queue!');
    }
}

export default shuffle;