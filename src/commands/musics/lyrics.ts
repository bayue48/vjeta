import { useQueue, useMainPlayer } from 'discord-player';
import { Command } from '../../types';
import { EmbedBuilder } from 'discord.js';

const lyrics: Command = {
    enable: true,
    name: "lyrics",
    description: "Get lyrics of a song",
    execute: async (message, args) => {
        let query = "";
        if (!args[1]) {
            const queue = useQueue()
            if (!queue) return message.reply('This server has no queue!')

            if (!queue.isPlaying()) return message.reply('No song is currently playing!')

            const artist = queue?.currentTrack?.author;
            const track = queue?.currentTrack?.title;
            query = `${artist} ${track}`
        } else {
            args.shift();
            query = args.join(' ');
        }

        const player = useMainPlayer();
        const lyrics = await player?.lyrics.search({
            q: query,
        });

        if (!lyrics.length)
            return message.reply('No lyrics found for this song!');

        const trimmedLyrics = lyrics[0].plainLyrics.substring(0, 1997);

        const embed = new EmbedBuilder()
            .setTitle(lyrics[0].name)
            .setAuthor({
                name: lyrics[0].artistName,
            })
            .setDescription(
                trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics,
            )
            .setColor('Yellow');

        return message.reply({ embeds: [embed] });


    }
}

export default lyrics;
