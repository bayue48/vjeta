import { Command } from "../../types";
import { embedBuilder } from "../../helpers/functions";

const greet: Command = {
  name: "greet",
  aliases: ["sayhello", "hello", "hey", "hola"],
  description: "Greet someone or yourself",
  usage: `greet <@user>`,
  enable: true,
  cooldowns: 10,
  execute: (message) => {
    let toGreet = message.mentions.members?.first();
    message.reply(embedBuilder({
      description: `Hello there ${toGreet ? toGreet.user.username : message.member?.user.username}!`
    }));
  },
};

export default greet;
