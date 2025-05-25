import { ActivityType, Client, Events, PresenceUpdateStatus } from "discord.js";
export const name = Events.ClientReady;
export const once = true;
export async function execute(client) {
    if (!client.user || !client.application)
        return;
    console.log(`🚩Logged in as ${client.user.tag}!`);
    const activityTypeMap = {
        'PLAYING': ActivityType.Playing,
        'WATCHING': ActivityType.Watching,
        'LISTENING': ActivityType.Listening,
        'STREAMING': ActivityType.Streaming,
        'COMPETING': ActivityType.Competing
    };
    const statusMap = {
        'online': PresenceUpdateStatus.Online,
        'idle': PresenceUpdateStatus.Idle,
        'dnd': PresenceUpdateStatus.DoNotDisturb,
        'invisible': PresenceUpdateStatus.Invisible
    };
    const statusType = process.env.BOT_STATUS || 'online';
    const activityType = process.env.ACTIVITY_TYPE || 'PLAYING';
    const activityName = process.env.ACTIVITY_NAME || 'Shoudo sakusen jikkou!';
    client.user.setPresence({
        status: statusMap[statusType],
        activities: [{
                name: activityName,
                type: activityTypeMap[activityType]
            }]
    });
    console.log(`🗿Bot status set to: ${statusType}`);
    console.log(`👨‍🎤Activity set to: ${activityType} ${activityName}`);
}
