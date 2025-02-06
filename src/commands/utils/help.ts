import { embedBuilder } from "../../helpers/functions";
import { Command } from "../../types";

const help: Command = {
    enable: true,
    name: "help",
    aliases: ["h"],
    usage: `help <command>`,
    description: "Show all commands",
    execute: async (message, args) => {
        if (!args[1]) {
            const commands = message.client.commands.map(cmd => `\`${cmd.name}\``);
            return message.reply(embedBuilder({
                title: 'Help',
                description: `Here are all the commands you can use!`,
                fields: [
                    {
                        name: 'Commands',
                        value: `${commands.join(', ')}`,
                    }
                ]
            }));
        }

        const command =
            message.client.commands.get(args[1]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[1]));
        if (!command)
            return message.reply(embedBuilder({
                description: `Command \`${args[1]}\` not found!`
            }));

        return message.reply(embedBuilder({
            title: 'Help',
            description: `**Name**: ${command.name}`,
            fields: [
                {
                    name: 'Description',
                    value: `${command.description}`,
                    inline: true
                },
                {
                    name: 'Usage',
                    value: `${process.env.PREFIX}${command.usage}`,
                    inline: true
                },
                {
                    name: 'Aliases',
                    value: `${command.aliases ? command.aliases.join(', ') : 'None'}`,
                    inline: true
                }
            ]
        }));
    }
};

export default help;