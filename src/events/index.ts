import { Client } from "discord.js";
import path from "path";
import fs from "fs";

export default function ActiveAllEvents(client: Client) {
    const eventFolder = path.join(__dirname);
    for (const folder of fs.readdirSync(eventFolder)) {
        const folderPath = path.join(eventFolder, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue;
    
        const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of eventFiles) {
            const event = require(path.join(folderPath, file));
            if (!event.name || typeof event.execute !== "function") {
                console.log(`Event at ${path.join(folderPath, file)} is missing a name or execute function`);
                continue;
            }
            // console.log(`Event ${event.name} loaded`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }
        }
    }       
}