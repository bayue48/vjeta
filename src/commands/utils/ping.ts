import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { embedBuilder, getThemeColor } from "../../functions";
import { Command } from "../../types";

const { Flags } = PermissionsBitField

const ping: Command = {
  enable: true,
  name: "ping",
  execute: async (message, args) => {
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
  permissions: [Flags.ViewChannel, Flags.SendMessages],
};

export default ping;