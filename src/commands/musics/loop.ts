import { useQueue, useHistory } from 'discord-player';
import { Command, EmbedData } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';

const loop: Command = {
    enable: true,
    name: "loop",
    description: "Set loop mode",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue,
        }));

        // Mode	    Value	Description
        // Off	    0	    Default mode with no loop active
        // Track	1	    Loops the current track
        // Queue	2	    Loops the current queue
        // Autoplay	3	    Play related songs automatically based on your existing queue

        const loopMode = queue.repeatMode;
        loopMode === 0 ? queue.setRepeatMode(1) : loopMode === 1 ? queue.setRepeatMode(2) : loopMode === 2 ? queue.setRepeatMode(3) : queue.setRepeatMode(0);

        return message.reply(embedBuilder({
            description: `Loop mode is ${loopMode}`,
        }));
    }
}

export default loop;