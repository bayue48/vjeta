import { useQueue, useHistory } from 'discord-player';
import { Command } from '../../types';

const previous: Command = {
    enable: true,
    name: "previous",
    description: "Play previous song",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply('This server has no queue!');

        if (queue.tracks.size == 1) return message.reply('There not enough songs in the queue to shuffle!');

        const history = useHistory();
        history?.previous();
    }
}

export default previous;