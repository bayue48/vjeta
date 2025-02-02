import { PermissionsBitField } from "discord.js";
import { Command } from "../../types";
import { embedBuilder } from "../../helpers/functions";

const { Flags } = PermissionsBitField

const greet: Command = {
  name: "greet",
  aliases: ["sayhello", "hello", "hey", "hola"],
  description: "Greet someone",
  enable: true,
  cooldowns: 10,
  permissions: [Flags.ViewChannel, Flags.SendMessages],
  execute: (message) => {
    let toGreet = message.mentions.members?.first();
    message.reply(embedBuilder({
      description: `Hello there ${toGreet ? toGreet.user.username : message.member?.user.username}!`
    }));
  },
};

export default greet;
