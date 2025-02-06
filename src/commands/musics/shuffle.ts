import { useQueue } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';

const shuffle: Command = {
    enable: true,
    name: "shuffle",
    aliases: ["sh"],
    usage: `shuffle`,
    description: "Shuffle the queue",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));
        if (queue.tracks.size < 2) return message.reply(embedBuilder({
            description: 'There not enough songs in the queue to shuffle!'
        }));
        
        queue.tracks.shuffle();
        return message.reply(embedBuilder({
            description: 'Shuffled the queue!'
        }));
    }
}

export default shuffle;