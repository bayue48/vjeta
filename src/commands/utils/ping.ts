import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { getThemeColor } from "../../functions";
import { Command } from "../../types";

const ping: Command = {
  enable: true,
  name: "ping",
  execute: async (message, args) => {
    const ping = message.client.ws.ping;
    let state;
    if (ping > 500) state = "🔴";
    else if (ping > 200) state = "🟡";
    else state = "🟢";

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(getThemeColor('mainColor'))
          .setTimestamp()
          .addFields(
            { name: "🏓 | Pong!", value: `\`\`\`yml\n${state} | ${ping}ms\`\`\`` },
          )
      ]
    });
  },
  permissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
};

export default ping;
