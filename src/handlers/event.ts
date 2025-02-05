import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { color, fileType } from "../helpers/functions";
import { BotEvent } from "../types";

module.exports = (client: Client) => {
  let eventsDir = join(__dirname, "../events");
  readdirSync(eventsDir).forEach((file) => {
    if (!file.endsWith(fileType(process.env.ENV))) return;
    let event: BotEvent = require(`${eventsDir}/${file}`).default;
    if (!event.enable) return;
    event.once
      ? client.once(event.name, (...args) => event.execute(...args))
      : client.on(event.name, (...args) => event.execute(...args));
    console.log(
      color(
        'mainColor',
        `[🔧] Successfully loaded event ${color('secColor', event.name)}`
      )
    );
  });
};
