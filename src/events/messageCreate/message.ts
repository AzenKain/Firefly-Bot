import { config } from "@/config";
import { Client, Events, Message } from "discord.js";

export const name = Events.MessageCreate;

export const once = false;

export async function execute(client: Client, message: Message) {
    if (message.author.bot) return;

    const prefix = config.DISCORD_PREFIX;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.prefix.get(commandName);

    if (command) {
        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            await message.reply('Đã xảy ra lỗi khi thực hiện lệnh này!');
        }
    }
}

