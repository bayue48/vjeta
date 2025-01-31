import {
  SlashCommandBuilder,
  CommandInteraction,
  Collection,
  PermissionResolvable,
  Message,
  AutocompleteInteraction,
} from "discord.js";
import mongoose from "mongoose";

export interface SlashCommand {
  description?: string;
  enable: boolean;
  command: SlashCommandBuilder | any;
  cooldowns?: number; // in seconds
  botPermissions: Array<PermissionResolvable>;
  execute: (interaction: CommandInteraction) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
}

export interface Command {
  name: string;
  aliases?: Array<string>;
  description?: string;
  usage?: string;
  enable: boolean;
  cooldowns?: number;
  permissions?: Array<PermissionResolvable>;
  botPermissions?: Array<PermissionResolvable>;
  execute: (message: Message, args: Array<string>) => void;
}

interface GuildOptions {
  prefix: string;
}

export interface IGuild extends mongoose.Document {
  guildID: string;
  options: GuildOptions;
  joinedAt: Date;
}

export type GuildOption = keyof GuildOptions;
export interface BotEvent {
  name: string;
  enable: boolean;
  once?: boolean | false;
  execute: (...args) => void;
}

export interface EmbedData {
  title?: string;
  description?: string;
  url?: string;
  thumbnail?: string;
  color?: number;
  fields?: field[];
}

interface field {
  name: string;
  value: string;
  inline?: boolean | false;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      GUILD_ID: string;
      PREFIX: string;
      MONGO_URI: string;
      MONGO_DATABASE_NAME: string;
      ENV: string;
      YOUTUBE_TOKEN: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
    commands: Collection<string, Command>;
    cooldowns: Collection<string, number>;
  }
}
