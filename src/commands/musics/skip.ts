import { useQueue } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';

const skip: Command = {
    enable: true,
    name: "skip",
    aliases: ["s"],
    usage: `skip`,
    description: "Skip the current song",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));
        if (!queue.isPlaying()) return message.reply(embedBuilder({
            description: constants.noSong
        }));

        queue.node.skip();
        return message.reply(embedBuilder({
            description: 'Skipped the song!'
        }));
    }
}

export default skip;