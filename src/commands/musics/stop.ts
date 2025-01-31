import { useQueue } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../functions';

const previous: Command = {
    enable: true,
    name: "previous",
    description: "Play previous song",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));

        queue.delete();
        return message.reply(embedBuilder({
            description: 'Stopped the music!'
        }));
    }
}

export default previous;