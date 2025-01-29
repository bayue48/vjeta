import { useMainPlayer } from 'discord-player';
import { Command } from '../types';

const play: Command = {
    enable: true,
    name: "play",
    description: "Play a song",
    execute: async (message, args) => {
        const player = useMainPlayer();
        const channel = message.member?.voice.channel;
        if (!channel) return message.reply('You are not connected to a voice channel!');
        console.log(args)
        args.shift();

        const query = args.join(' ');
        console.log(query)

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: message.channel,
                },
            });

            return message.reply(`**${track.title}** enqueued!`);
        } catch (e) {
            return message.reply(`Something went wrong: ${e}`);
        }
    }
}

export default play;