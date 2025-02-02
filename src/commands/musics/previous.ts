import { useQueue, useHistory } from 'discord-player';
import { Command } from '../../types';
import { constants, embedBuilder } from '../../helpers/functions';

const previous: Command = {
    enable: true,
    name: "previous",
    description: "Play previous song",
    execute: async (message) => {
        const queue = useQueue();
        if (!queue) return message.reply(embedBuilder({
            description: constants.noQueue
        }));
        if (queue.tracks.size == 1) return message.reply(embedBuilder({
            description: 'There is no previous song!'
        }));

        const history = useHistory();
        history?.previous();
    }
}

export default previous;