import { useQueue } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';

const stop: Command = {
    enable: true,
    name: "stop",
    aliases: ["leave"],
    usage: `stop`,
    description: "Stop the music",
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

export default stop;