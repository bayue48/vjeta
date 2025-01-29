import { useQueue } from 'discord-player';
import { Command } from '../../types';

const nowPlaying: Command = {
    enable: true,
    name: "now-playing",
    description: "Show now playing song",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply('This server has no queue!');

        const track = queue?.currentTrack;
        if (!track) return message.reply('No song is currently playing!');

        return message.reply(`Now playing: **${track?.title}**`);
    }
}

export default nowPlaying;