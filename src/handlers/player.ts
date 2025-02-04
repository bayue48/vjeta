import { Client } from "discord.js";
import { Player, GuildQueueEvent } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei"
import { SoundCloudExtractor, SpotifyExtractor } from "@discord-player/extractor";

module.exports = async (client: Client) => {
    const player = new Player(client);

    // await player.extractors.loadMulti(DefaultExtractors);
    await player.extractors.register(YoutubeiExtractor, { cookie: process.env.YOUTUBE_COOKIE });
    await player.extractors.register(SpotifyExtractor, {});
    await player.extractors.register(SoundCloudExtractor, {});

    console.log("deep || ", player.scanDeps());

    player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
        // Emitted when the player starts to play a song
        await queue.metadata.send(`Started playing: **${track.title}**`);
    });

    player.events.on(GuildQueueEvent.AudioTrackAdd, async (queue, track) => {
        // Emitted when the player adds a single song to its queue
        await queue.metadata.send(`Track **${track.title}** queued`);
    });

    player.events.on(GuildQueueEvent.AudioTracksAdd, async (queue, track) => {
        // Emitted when the player adds multiple songs to its queue
        await queue.metadata.send(`Multiple Track's queued`);
    });

    player.events.on(GuildQueueEvent.PlayerSkip, async (queue, track) => {
        // Emitted when the audio player fails to load the stream for a song
        await queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
    });

    player.events.on(GuildQueueEvent.Disconnect, async (queue) => {
        // Emitted when the bot leaves the voice channel
        await queue.metadata.send('Looks like my job here is done, leaving now!');
    });

    player.events.on(GuildQueueEvent.EmptyChannel, async (queue) => {
        // Emitted when the voice channel has been empty for the set threshold
        // Bot will automatically leave the voice channel with this event
        await queue.metadata.send(`Leaving because no vc activity for the past 5 minutes`);
    });

    player.events.on(GuildQueueEvent.EmptyQueue, async (queue) => {
        // Emitted when the player queue has finished
        await queue.metadata.send('Queue finished!');
    });

    player.on(GuildQueueEvent.Debug, (message) => {
        // Emitted when the player sends debug info
        // Useful for seeing what dependencies, extractors, etc are loaded
        console.log(`General player debug event: ${message}`);
    });

    player.events.on(GuildQueueEvent.Debug, (queue, message) => {
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
