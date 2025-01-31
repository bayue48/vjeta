import { useQueue, useTimeline } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../functions';

const pause: Command = {
    enable: true,
    name: "pause",
    description: "Pause the music",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));

        const timeline = useTimeline();
        if (!timeline) return message.reply(embedBuilder({
            description: constants.noSong
        }));

        const wasPaused = timeline.paused;
        wasPaused ? timeline.resume() : timeline.pause();

        return message.reply(embedBuilder({
            description: `**${wasPaused ? 'Resumed' : 'Paused'}** the music!`
        }));
    }
}

export default pause;