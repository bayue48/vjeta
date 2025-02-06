import { useMainPlayer, useQueue } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';

const playNext: Command = {
    enable: true,
    name: "play-next",
    aliases: ["pn"],
    usage: `play-next <song name>`,
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
            if (!searchResult.tracks[0]) return message.reply(embedBuilder({
                description: 'No results found!'
            }));
            queue?.insertTrack(searchResult.tracks[0], 1);
            return message.reply(embedBuilder({
                description: `**${searchResult.tracks[0].title}** has been added to the queue!`
            }));
        } catch (e) {
            return message.reply(embedBuilder({
                description: constants.err
            }));
        }
    }
}

export default playNext;