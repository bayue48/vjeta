import { PermissionsBitField } from "discord.js";
import { embedBuilder } from "../../helpers/functions";
import { setPrefix } from "../../helpers/db";
import { Command } from "../../types";

const { Flags } = PermissionsBitField

const command: Command = {
    enable: true,
    name: "changePrefix",
    execute: (message, args) => {
        let prefix = args[1];
        if (!prefix) return message.reply(embedBuilder({
            description: 'Please provide a prefix!'
        }));
        if (!message.guild) return;
        setPrefix(message.guild, "prefix", prefix);
        message.reply(embedBuilder({
            description: `Prefix Successfully Changed!\n**New Prefix: **\`${prefix}\``
        }));
    },
    permissions: [Flags.Administrator],
    aliases: [],
};

export default command;
