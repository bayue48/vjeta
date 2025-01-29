import { Guild, EmbedBuilder,WebhookClient, Events } from "discord.js";
import { getThemeColor } from "../functions";
import GuildModel from "../schemas/guild";
import { BotEvent } from "../types";

const event: BotEvent = {
  enable: true,
  name: Events.GuildCreate,
  execute: (guild: Guild) => {
    let newGuild = new GuildModel({
      guildID: guild.id,
      options: {},
      joinedAt: Date.now(),
    });
    newGuild.save();

    const joinLeaveWebhookUrl = process.env.joinLeaveWebhook
    if(!joinLeaveWebhookUrl)return
    const joinLeaveWebhook = new WebhookClient({
      url: joinLeaveWebhookUrl
    })
    const embed = new EmbedBuilder()
    .setTitle("New Server")
    .setThumbnail(guild.iconURL())
    .setColor(getThemeColor('mainColor'))
    .addFields(
      {
        name: "Guild Name",
        value: guild.name,
        inline: false,
      },
      {
        name: "ID",
        value: guild.id,
        inline: false,
      },
      {
        name: "OwnerId",
        value: `[\`${guild.ownerId}\`]`,
        inline: false,
      },
      {
        name: "Members",
        value: `\`\`\`yaml\n${guild.memberCount}\`\`\``,
        inline: false,
      }
    )

    joinLeaveWebhook.send({
    username: "NEW SERVER",
    embeds: [embed],
  });
  },
};

export default event;
