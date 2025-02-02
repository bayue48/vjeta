import { Client, Events } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../helpers/functions";

const event: BotEvent = {
  enable: true,
  name: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    console.log(
      color('mainColor', `[🤖] Logged in as ${color('secColor', `${client.user?.tag}(${client.user?.id})`)}`)
    );
  },
};

export default event;
