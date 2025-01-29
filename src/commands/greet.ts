import { PermissionFlagsBits } from "discord.js";
import { Command } from "../types";

const greet: Command = {
  name: "greet",
  aliases: ["sayhello", "hello", "hey", "hola"],
  description: "Greet someone",
  enable: true,
  cooldowns: 10,
  permissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
  execute: (message) => {
    let toGreet = message.mentions.members?.first();
    message.reply(
      `Hello there ${toGreet ? toGreet.user.username : message.member?.user.username
      }!`
    );
  },
};

export default greet;
