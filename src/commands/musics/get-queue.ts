import { useQueue, usePlayer, useMainPlayer, deserialize } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';
import { getQueue as gq } from "../../helpers/db";

const getQueue: Command = {
    enable: true,
    name: "get-queue",
    description: "get queue",
    execute: async (message, args) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));

        if (!args[1]) return message.reply(embedBuilder({
            description: 'Please provide a name of the queue!'
        }))

        if (!message.guild) return
        args.shift();
        const queueName = args.join(' ');
        const serializedTrack = await gq(message.guild, queueName);

        const player = useMainPlayer()
        deserialize(player, serializedTrack)

        return message.reply(embedBuilder({
            description: `**${queueName}** has been added to the queue!`
        }));
    }
}

export default getQueue