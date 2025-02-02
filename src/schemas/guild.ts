import { Schema, model } from "mongoose";
import { IGuild, IQueue } from "../types";

const GuildSchema = new Schema<IGuild>({
    guildID: { required: true, type: String },
    options: {
        prefix: { type: String, default: process.env.PREFIX }
    }
})

const QueueSchema = new Schema<IQueue>({
    guildID: { required: true, type: String },
    queueName: { required: true, type: String },
    queue: { required: true, type: Array }
})

export const GuildModel = model("guild", GuildSchema)
export const QueueModel = model("queue", QueueSchema)

