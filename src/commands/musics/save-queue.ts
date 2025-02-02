import { useQueue, serialize } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../functions';

const saveQueue: Command = {
    enable: true,
    name: "save-queue",
    description: "save queue",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));

        const serializedTracks = queue?.tracks.map((track) => serialize(track));
        console.log("tets", serializedTracks)
    }
}

export default saveQueue;