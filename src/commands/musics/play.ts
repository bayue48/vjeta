import { useMainPlayer } from 'discord-player';
import { PermissionsBitField } from 'discord.js';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../functions';

const { Flags } = PermissionsBitField

const play: Command = {
    enable: true,
    name: "play",
    description: "Play a song",
    permissions: [Flags.SendMessages, Flags.Speak],
    execute: async (message, args) => {
        const player = useMainPlayer();
        const channel = message.member?.voice.channel;
        if (!channel) return message.reply(embedBuilder({
            description: 'You must be in a voice channel to use this command!'
        }));

        if (player.nodes.get(message.guild?.id!)) {
            return message.reply(embedBuilder({
                description: 'The bot is already playing music in another voice channel!'
            }));
        }

        args.shift();
        const query = args.join(' ');

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: message.channel,
                    leaveOnEnd: false,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 300000,
                },
            });

            return message.reply(embedBuilder({
                description: `**${track.title} - ${track.author}** has been added to the queue!`
            }));
        } catch (e) {
            console.log(e)
            return message.reply(constants.err);
        }
    }
}

export default play;