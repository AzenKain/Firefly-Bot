import type { slashCommand } from "@/types/discord.js";
import { Client, Collection, REST, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import path from "path";
import fs from "fs";
import { config } from "@/config";

export async function ActiveAllSlashCommands(client: Client) {
    client.slash = new Collection<string, slashCommand>();

    const commandFolder = path.join(__dirname);
    for (const folder of fs.readdirSync(commandFolder)) {
        const folderPath = path.join(commandFolder, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;
    
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            if (!command.data?.name || typeof command.execute !== "function") {
                console.log(`Slash command at ${path.join(folderPath, file)} is missing a name or execute function`);
                continue;
            }
            // console.log(`Slash command ${command.data.name} loaded`);
            client.slash.set(command.data.name, command);
        }
    }
}
const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

export async function registerCommandsAll() {
    const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    const commandFolder = path.join(__dirname);

    for (const folder of fs.readdirSync(commandFolder)) {
        const folderPath = path.join(commandFolder, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;

        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".ts"));
        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            if (!command.data?.name || typeof command.execute !== "function") continue;
            commands.push(command.data.toJSON());
        }
    }

    try {
        console.log('Started refreshing application (/) commands.');
        const data = await rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID),
            { body: commands }) as RESTPostAPIChatInputApplicationCommandsJSONBody[];
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}
