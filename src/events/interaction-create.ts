import { Interaction, EmbedBuilder, Events } from "discord.js";
import { checkBotPermissions, getThemeColor } from "../helpers/functions";
import { BotEvent } from "../types";

const interaction: BotEvent = {
  enable: true,
  name: Events.InteractionCreate,
  execute: (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      let command = interaction.client.slashCommands.get(
        interaction.commandName
      );
      let cooldowns = interaction.client.cooldowns.get(
        `${interaction.commandName}-${interaction.user.username}`
      );
      if (!command) return;
      if (command.cooldowns && cooldowns) {
        if (Date.now() < cooldowns) {
          interaction.reply(
            `You have to wait ${Math.floor(
              Math.abs(Date.now() - cooldowns) / 1000
            )} second(s) to use this command again.`
          );
          setTimeout(() => interaction.deleteReply(), 5000);
          return;
        }
        interaction.client.cooldowns.set(
          `${interaction.commandName}-${interaction.user.username}`,
          Date.now() + command.cooldowns * 1000
        );
        setTimeout(() => {
          interaction.client.cooldowns.delete(
            `${interaction.commandName}-${interaction.user.username}`
          );
        }, command.cooldowns * 1000);
      } else if (command.cooldowns && !cooldowns) {
        interaction.client.cooldowns.set(
          `${interaction.commandName}-${interaction.user.username}`,
          Date.now() + command.cooldowns * 1000
        );
      }
      let neededBotPermissions = checkBotPermissions(interaction, command.botPermissions)
      if (neededBotPermissions !== null) {
        return interaction.reply({ content: `❌ | **Ops! I need these permissions: ${neededBotPermissions?.join(", ")} To be able to execute the command**` });;
      }

      try {
        command.execute(interaction);
      } catch (e) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(getThemeColor('mainColor'))
              .setTimestamp()
              .setDescription(`❌ | **Ops! Something went wrong while executing the command**`)
          ]
        });
        console.log(e);
        return;
      }
    } else if (interaction.isAutocomplete()) {
      const command = interaction.client.slashCommands.get(
        interaction.commandName
      );
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }
      try {
        if (!command.autocomplete) return;
        command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};

export default interaction;
