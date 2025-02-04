import { useQueue, usePlayer, useMainPlayer, deserialize, SerializedTrack } from 'discord-player';
import { Command } from '../../types';
import { embedBuilder } from '../../helpers/functions';
import { getQueue as gq } from "../../helpers/db";

const getQueue: Command = {
    enable: true,
    name: "get-queue",
    description: "get queue",
    execute: async (message, args) => {
        const channel = message.member?.voice.channel;
        if (!channel) return message.reply(embedBuilder({
            description: 'You must be in a voice channel to use this command!'
        }));

        if (!args[1]) return message.reply(embedBuilder({
            description: 'Please provide a name of the queue!'
        }))

        if (!message.guild) return
        args.shift();
        const queueName = args.join(' ');
        const serializedTracks = await gq(message.guild, queueName)
        const player = useMainPlayer()
        const queue = useQueue();

        if (!queue) {
            await player.play(channel, serializedTracks, {
                nodeOptions: {
                    metadata: message.channel,
                    leaveOnEnd: false,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 300000,
                },
            });
        } else {
            serializedTracks.forEach((track: SerializedTrack) => {
                queue?.addTrack(deserialize(player, track));
            });
        }

        return message.reply(embedBuilder({
            description: `**${queueName}** has been added to the queue!`
        }));
    }
}

export default getQueue