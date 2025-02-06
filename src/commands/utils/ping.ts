import { embedBuilder } from "../../helpers/functions";
import { Command } from "../../types";

const ping: Command = {
  enable: true,
  name: "ping",
  aliases: ["pong"],
  usage: `ping`,
  description: "Check the bot's ping",
  execute: async (message) => {
    const ping = message.client.ws.ping;
    let state;
    if (ping > 500) state = "🔴";
    else if (ping > 200) state = "🟡";
    else state = "🟢";
    message.reply(embedBuilder({
      title: "🏓 | Pong!",
      description: `\`\`\`${state} | ${ping}ms\`\`\``
    }));
  },
};

export default ping;