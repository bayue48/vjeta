import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { color, fileType } from "../helpers/functions";
import { Command, SlashCommand } from "../types";

module.exports = (client: Client) => {
  const slashCommands: SlashCommandBuilder[] = [];
  const commands: Command[] = [];

  let slashCommandsDir = join(__dirname, "../slashCommands");
  let commandsDir = join(__dirname, "../commands");

  readdirSync(slashCommandsDir).forEach((file) => {
    if (!file.endsWith(fileType(process.env.ENV))) return;
    let command: SlashCommand = require(`${slashCommandsDir}/${file}`).default;
    if (!command || !command.enable) return;
    slashCommands.push(command.command);
    client.slashCommands.set(command.command.name, command);
  });

  readdirSync(commandsDir).forEach((moduleDir) => {
    const modulePath = join(commandsDir, moduleDir);
    if (!statSync(modulePath).isDirectory()) return;
    readdirSync(modulePath).forEach((file) => {
      if (!file.endsWith(fileType(process.env.ENV))) return;
      let command: Command = require(`${modulePath}/${file}`).default;
      if (!command || !command.enable) return;
      commands.push(command);
      client.commands.set(command.name, command);
    });
  });

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  rest
    .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
      body: slashCommands.map((command) => command.toJSON()),
    })
    .then((data: any) => {
      console.log(
        color(
          'mainColor',
          `[✅] Successfully Loaded ${color(
            'secColor',
            data.length
          )} SlashCommand(s)`
        )
      );
      console.log(
        color(
          'mainColor',
          `[✅] Successfully Loaded ${color(
            'secColor',
            commands.length
          )} Command(s)`
        )
      );
    })
    .catch((e: any) => {
      console.log(e);
    });
};