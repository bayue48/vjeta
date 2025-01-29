import { useMainPlayer } from 'discord-player';
import { PermissionsBitField } from 'discord.js';
import { Command } from '../../types';

const { Flags } = PermissionsBitField

const play: Command = {
    enable: true,
    name: "play",
    description: "Play a song",
    permissions: [Flags.SendMessages, Flags.Speak],
    execute: async (message, args) => {
        const player = useMainPlayer();
        const channel = message.member?.voice.channel;

        if (!channel) return message.reply('You need to be in a voice channel to use this command!');

        // Check if the bot is already playing in a different voice channel
        if (player.nodes.get(message.guild?.id!)) {
            return message.reply('The bot is already playing music in another voice channel!');
        }

        args.shift();
        const query = args.join(' ');

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: message.channel,
                },
            });

            return message.reply(`**${track.title}** has been added to the queue!`);
        } catch (e) {
            console.log(e)
            return message.reply(`Something went wrong: ${e}`);
        }
    }
}

export default play;