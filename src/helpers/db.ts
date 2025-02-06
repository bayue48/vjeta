import mongoose from "mongoose";
import { Guild } from "discord.js";
import { GuildModel, QueueModel } from "../schemas/guild"
import { GuildOption } from "../types"
import { SerializedTrack } from "discord-player";


export const getPrefix = async (guild: Guild, option: GuildOption) => {
    if (mongoose.connection.readyState === 0) throw new Error("[❌] Database not connected.")
    let foundGuild = await GuildModel.findOne({ guildID: guild.id })
    if (!foundGuild) return null;
    return foundGuild.options[option]
}

export const setPrefix = async (guild: Guild, option: GuildOption, value: any) => {
    if (mongoose.connection.readyState === 0) throw new Error("[❌] Database not connected.")
    let foundGuild = await GuildModel.findOne({ guildID: guild.id })
    if (!foundGuild) {
        let newGuild = new GuildModel({
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

export const saveQueue = async (guild: Guild, queueName: string, queue: Array<SerializedTrack>) => {
    if (mongoose.connection.readyState === 0) throw new Error("[❌] Database not connected.")
    let newQueue = new QueueModel({
        guildID: guild.id,
        queueName: queueName,
        queue: queue
    });
    newQueue.save()
    return null;
}

export const getQueue = async (guild: Guild, queueName: string) => {
    if (mongoose.connection.readyState === 0) throw new Error("[❌] Database not connected.")
    let foundQueue = await QueueModel.findOne({ guildID: guild.id, queueName: queueName })
    if (!foundQueue) return null;
    return foundQueue.queue
}