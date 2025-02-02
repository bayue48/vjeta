import { useQueue } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';

const volume: Command = {
    enable: true,
    name: "volume",
    description: "Set volume",
    execute: async (message, args) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));

        // min 0 max 100
        if (parseInt(args[0]) < 0 || parseInt(args[0]) > 100) return message.reply(embedBuilder({
            description: 'Volume must be between 0 and 100'
        }));

        const volume = parseInt(args[0]); {
            queue.node.setVolume(volume);
            return message.reply(embedBuilder({
                description: `Volume set to ${volume}%`
            }));
        }
    }
}

export default volume;