import { useMainPlayer } from 'discord-player';
import { Command } from "../../types";
import { embedBuilder } from "../../helpers/functions";

const tts: Command = {
    name: "text-to-speech",
    aliases: ["tts"],
    description: "Text to speech",
    usage: "text-to-speech <text>",
    enable: true,
    cooldowns: 10,
    execute: async (message, args) => {
        const player = useMainPlayer();
        const channel = message.member?.voice.channel;
        if (!channel) return message.reply(embedBuilder({
            description: 'You must be in a voice channel to use this command!'
        }));

        args.shift();
        const query = args.join(' ');

        await player.play(channel, `tts:${query}`, {
            nodeOptions: {
                metadata: message.channel,
                leaveOnEnd: false,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 300000,
            },
        });
    },
};

export default tts;
