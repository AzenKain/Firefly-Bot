import { Client, Collection } from "discord.js";
import path from "path";
import fs from "fs";
import type { prefixCommand } from "@/types/discord.js";

export function ActiveAllPrefixCommands(client: Client) {

    const commandFolder = path.join(__dirname);
    client.prefix = new Collection<string, prefixCommand>();
    for (const folder of fs.readdirSync(commandFolder)) {
        const folderPath = path.join(commandFolder, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;
    
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".ts ") || file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            if (!command.name || typeof command.execute !== "function") {
                console.log(`Prefix command at ${path.join(folderPath, file)} is missing a name or execute function`);
                continue;
            }
            // console.log(`Prefix command ${command.name} loaded`);
            client.prefix.set(command.name, command);
        }
    }
}
