import { useMainPlayer, useQueue } from 'discord-player';
import { Command } from '../../types';

const playNext: Command = {
    enable: true,
    name: "play-next",
    description: "Play after current song",
    execute: async (message, args) => {
        const player = useMainPlayer();
        const queue = useQueue(message.guild?.id!);
        console.log(args)
        args.shift();

        const query = args.join(' ');
        console.log(query)
        try {
            const searchResult = await player.search(query);
            if (!searchResult.tracks[0]) return message.reply('No results found!');
            queue?.insertTrack(searchResult.tracks[0], 1);
            return message.reply(`**${searchResult.tracks[0].title}** enqueued!`);
        } catch (e) {
            return message.reply(`Something went wrong: ${e}`);
        }
    }
}

export default playNext;