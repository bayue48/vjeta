import { Client, GatewayIntentBits, Collection, PresenceUpdateStatus, Partials, ActivityType, } from "discord.js";
import { Command, SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";

config()

const { Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates } = GatewayIntentBits
const client = new Client({
    presence: {
        activities: [
            {
                name: "ZETA",
                type: ActivityType.Watching,
            }
        ],
        status: PresenceUpdateStatus.Online,
    },
    intents: [
        Guilds,
        MessageContent,
        GuildMessages,
        GuildMembers,
        GuildVoiceStates
    ],
    partials: [Partials.User, Partials.Message, Partials.Reaction],
    allowedMentions: { repliedUser: false }
})

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.TOKEN)
