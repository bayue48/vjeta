import { Client } from "discord.js";
import { Player, GuildQueueEvent } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei"
import { DefaultExtractors } from "@discord-player/extractor";

module.exports = (client: Client) => {
    // entrypoint for discord-player based application
    const player = new Player(client);

    player.extractors.register(YoutubeiExtractor, {});
    player.extractors.loadMulti(DefaultExtractors);

    console.log("deep || ", player.scanDeps());

    // Emitted when the player starts to play a song
    player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
        await queue.metadata.send(`Started playing: **${track.title}**`);
    });

    console.log("deep || ", player.scanDeps());

    // Emitted when the player starts to play a song
    player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
        await queue.metadata.send(`Started playing: **${track.title}**`);
    });

    player.events.on(GuildQueueEvent.AudioTrackAdd, (queue, track) => {
        // Emitted when the player adds a single song to its queue
        queue.metadata.send(`Track **${track.title}** queued`);
    });

    player.events.on(GuildQueueEvent.AudioTracksAdd, (queue, track) => {
        // Emitted when the player adds multiple songs to its queue
        queue.metadata.send(`Multiple Track's queued`);
    });

    player.events.on(GuildQueueEvent.PlayerSkip, (queue, track) => {
        // Emitted when the audio player fails to load the stream for a song
        queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
    });

    player.events.on(GuildQueueEvent.Disconnect, (queue) => {
        // Emitted when the bot leaves the voice channel
        queue.metadata.send('Looks like my job here is done, leaving now!');
    });

    player.events.on(GuildQueueEvent.EmptyChannel, (queue) => {
        // Emitted when the voice channel has been empty for the set threshold
        // Bot will automatically leave the voice channel with this event
        queue.metadata.send(`Leaving because no vc activity for the past 5 minutes`);
    });

    player.events.on(GuildQueueEvent.EmptyQueue, (queue) => {
        // Emitted when the player queue has finished
        queue.metadata.send('Queue finished!');
    });

    player.on(GuildQueueEvent.Debug, async (message) => {
        // Emitted when the player sends debug info
        // Useful for seeing what dependencies, extractors, etc are loaded
        console.log(`General player debug event: ${message}`);
    });

    player.events.on(GuildQueueEvent.Debug, async (queue, message) => {
        // Emitted when the player queue sends debug info
        // Useful for seeing what state the current queue is at
        console.log(console.log(`[DEBUG ${queue.guild.id}] ${message}`));
    });

    player.events.on(GuildQueueEvent.Error, (queue, error) => {
        // Emitted when the player queue encounters error
        console.log(`General player error event: ${error.message}`);
        console.log(error);
    });

    player.events.on(GuildQueueEvent.PlayerError, (queue, error) => {
        // Emitted when the audio player errors while streaming audio track
        console.log(`Player error event: ${error.message}`);
        console.log(error);
    });
}
