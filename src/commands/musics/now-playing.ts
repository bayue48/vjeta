import { usePlayer, useQueue } from 'discord-player';
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

        const player = usePlayer();
        const progressBar = player?.createProgressBar();
        const timestamp = player?.getTimestamp();

        return message.reply(`Now playing: **${track?.title}** \n ${progressBar} \n Progress: ${timestamp?.progress}%`);
    }
}

export default nowPlaying;