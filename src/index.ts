import 'module-alias/register'
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { config } from "@/config";
import ActiveAllEvents from "@/events";
import { ActiveAllPrefixCommands, ActiveAllSlashCommands } from "@/commands";

console.log("🔥 Starting bot...")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember
    ]
});

ActiveAllPrefixCommands(client);
ActiveAllSlashCommands(client);
ActiveAllEvents(client);

(async () => {
    await client.login(config.DISCORD_TOKEN);
})();