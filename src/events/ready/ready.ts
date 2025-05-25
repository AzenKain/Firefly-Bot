import { ActivityType, Client, Events, PresenceUpdateStatus } from "discord.js";
// import { registerCommandsAll } from "@/commands";

export const name = Events.ClientReady;

export const once = true;

export async function execute(client: Client) {
    if (!client.user || !client.application) return;
    console.log(`🚩Logged in as ${client.user.tag}!`);
    // await registerCommandsAll()
    const activityTypeMap = {
        'PLAYING': ActivityType.Playing,
        'WATCHING': ActivityType.Watching,
        'LISTENING': ActivityType.Listening,
        'STREAMING': ActivityType.Streaming,
        'COMPETING': ActivityType.Competing
    } as const;

    const statusMap = {
        'online': PresenceUpdateStatus.Online,
        'idle': PresenceUpdateStatus.Idle,
        'dnd': PresenceUpdateStatus.DoNotDisturb,
        'invisible': PresenceUpdateStatus.Invisible
    } as const;

    const statusType = (process.env.BOT_STATUS as keyof typeof statusMap) || 'online';
    const activityType = (process.env.ACTIVITY_TYPE as keyof typeof activityTypeMap) || 'PLAYING';
    const activityName = process.env.ACTIVITY_NAME || 'Shoudo sakusen jikkou!';

    client.user.setPresence({
        status: statusMap[statusType],
        activities: [{
            name: activityName,
            type: activityTypeMap[activityType]
        }]
    });
    
    console.log(`🗿Bot status set to: ${statusType}`);
    console.log(`👨‍🎤Activity set to: ${activityType} ${activityName}`)
}