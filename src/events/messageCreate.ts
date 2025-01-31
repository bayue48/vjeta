import { ChannelType, Message, EmbedBuilder, Events } from "discord.js";
import {
  checkBotPermissions,
  checkPermissions,
  getGuildOption,
  sendTimedMessage,
  getThemeColor,
  embedBuilder,
} from "../functions";
import { BotEvent } from "../types";
import mongoose from "mongoose";
import { useMainPlayer } from "discord-player";

const event: BotEvent = {
  enable: true,
  name: Events.MessageCreate,
  execute: async (message: Message) => {
    if (!message.member || message.member.user.bot) return;
    if (!message.guild) return;
    let prefix = process.env.PREFIX;
    if (mongoose.connection.readyState === 1) {
      let guildPrefix = await getGuildOption(message.guild, "prefix");
      if (guildPrefix) prefix = guildPrefix;
    }
    // check bot mention
    const mention = new RegExp(`^<@!?${message.guild.members.me?.id}>( |)$`);
    if (message.content.match(mention)) {
      return message.reply(embedBuilder({description: `Hey My Prefix is: \`${prefix}\``}));
    }

    if (!message.content.startsWith(prefix)) return;
    if (message.channel.type !== ChannelType.GuildText) return;

    let args = message.content.substring(prefix.length).split(" ");
    let command = message.client.commands.get(args[0]);
    const player = useMainPlayer();

    // Create a context with the guild information
    const context = { guild: message.guild };

    if (!command) {
      let commandFromAlias = message.client.commands.find((command) =>
        command.aliases?.includes(args[0])
      );
      if (commandFromAlias) command = commandFromAlias;
      else return;
    }

    let cooldown = message.client.cooldowns.get(
      `${command.name}-${message.member.user.username}`
    );
    let neededPermissions = checkPermissions(
      message.member,
      command.permissions ?? []
    );
    if (neededPermissions !== null)
      return sendTimedMessage(
        `❌ | **Ops! You need these permissions: ${neededPermissions.join(", ")} To be able to execute the command**`,
        message.channel,
        5000
      );

    let neededBotPermissions = checkBotPermissions(message, command.botPermissions ?? []);
    if (neededBotPermissions !== null) {
      return message.reply(embedBuilder({ description: `❌ | **Ops! I need these permissions: ${neededBotPermissions?.join(", ")} To be able to execute the command**` }));;
    }

    if (command.cooldowns && cooldown) {
      if (Date.now() < cooldown) {
        sendTimedMessage(
          `You have to wait ${Math.floor(
            Math.abs(Date.now() - cooldown) / 1000
          )} second(s) to use this command again.`,
          message.channel,
          5000
        );
        return;
      }
      message.client.cooldowns.set(
        `${command.name}-${message.member.user.username}`,
        Date.now() + command.cooldowns * 1000
      );
      setTimeout(() => {
        message.client.cooldowns.delete(
          `${command?.name}-${message.member?.user.username}`
        );
      }, command.cooldowns * 1000);
    } else if (command.cooldowns && !cooldown) {
      message.client.cooldowns.set(
        `${command.name}-${message.member.user.username}`,
        Date.now() + command.cooldowns * 1000
      );
    }

    try {
      player.context.provide(context, () => command.execute(message, args));
    } catch (e) {
      console.log(e)
      return message.reply(embedBuilder({ description: `❌ | **Ops! Something went wrong while executing the command**` }));
    }
  },
};

export default event;
