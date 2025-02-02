import { useQueue, serialize } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';
import { saveQueue as sq } from "../../helpers/db";

const saveQueue: Command = {
    enable: true,
    name: "save-queue",
    description: "save queue",
    execute: async (message, args) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));

        if (args[1]) return message.reply(embedBuilder({
            description: 'Please provide a name for the queue!'
        }))

        const serializedTracks = queue?.tracks.map((track) => serialize(track));
        args.shift();
        if (!message.guild) return
        sq(message.guild, args.join(' '), serializedTracks);
    }
}

export default saveQueue;