import chalk from "chalk"
import {
    Embed,
    EmbedBuilder,
    Guild,
    GuildMember,
    PermissionFlagsBits,
    PermissionResolvable,
    TextChannel,
} from "discord.js"
import GuildDB from "./schemas/guild"
import { GuildOption, EmbedData } from "./types"
import mongoose from "mongoose";

type colorType = "mainColor" | "secColor" | "errorColor"
const themeColors = {
    mainColor: "#FBC630",
    secColor: "#FE6E10",
    errorColor: "#FF2222"
};

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

export const color = (color: colorType, message: any) => {
    return chalk.hex(themeColors[color])(message)
}

export const checkPermissions = (member: GuildMember, permissions: PermissionResolvable[]) => {
    let neededPermissions: PermissionResolvable[] = []
    permissions.forEach(permission => {
        if (!member.permissions.has(permission)) neededPermissions.push(permission)
    })
    if (neededPermissions.length === 0) return null
    return neededPermissions.map(p => {
        if (typeof p === "string") return `\`${p.split(/(?=[A-Z])/).join(" ")}\``
        else return Object.keys(PermissionFlagsBits).find(k => Object(PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(" ")
    })
}

export const checkBotPermissions = (message: any, permissions: PermissionResolvable[]) => {
    if (!message.channel?.permissionsFor(message.guild?.members.me).has('SendMessages')) return;
    let neededPermissions: PermissionResolvable[] = []
    permissions.forEach(permission => {
        if (!message.guild?.members.me?.permissions.has(permissions)) neededPermissions.push(permission)
    })
    if (neededPermissions.length === 0) return null;
    return neededPermissions.map(p => {
        if (typeof p === "string") return `\`${p.split(/(?=[A-Z])/).join(" ")}\``
        else return Object.keys(PermissionFlagsBits).find(k => Object(PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(" ")
    })

}

export const sendTimedMessage = (message: string, channel: TextChannel, duration: number) => {
    channel.send(embedBuilder({ description: message }))
        .then(m => setTimeout(async () => (await channel.messages.fetch(m)).delete(), duration))
    return
}

export const getGuildOption = async (guild: Guild, option: GuildOption) => {
    if (mongoose.connection.readyState === 0) throw new Error("[❌] Database not connected.")
    let foundGuild = await GuildDB.findOne({ guildID: guild.id })
    if (!foundGuild) return null;
    return foundGuild.options[option]
}

export const setGuildOption = async (guild: Guild, option: GuildOption, value: any) => {
    if (mongoose.connection.readyState === 0) throw new Error("[❌] Database not connected.")
    let foundGuild = await GuildDB.findOne({ guildID: guild.id })
    if (!foundGuild) {
        let newGuild = new GuildDB({
            guildID: guild.id,
            options: { [option]: value },
            joinedAt: Date.now(),
        });
        newGuild.save()
        return null;
    }
    foundGuild.options[option] = value
    foundGuild.save()
}

export const fileType = (env: string) => {
    if (env === "dev") return ".ts"
    else return ".js"
};

export const embedBuilder = (embed: EmbedData) => {
    const builder = new EmbedBuilder()
    if (embed.title) builder.setTitle(embed.title)
    if (embed.description) builder.setDescription(embed.description)
    if (embed.url) builder.setURL(embed.url)
    if (embed.thumbnail) builder.setThumbnail(embed.thumbnail)
    embed.color ? builder.setColor(embed.color) : builder.setColor(getThemeColor('mainColor'))
    if (embed.fields) builder.addFields(embed.fields)
    builder.setTimestamp()
    return { embeds: [builder] }
}

export const constants = {
    err: 'Something went wrong...',
    noQueue: 'This server has no queue!',
    noSong: 'No song is currently playing!'
}