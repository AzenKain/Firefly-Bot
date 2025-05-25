import { Message, Client } from "discord.js";

export const name = "ping";
export const description = "Kiểm tra thời gian phản hồi của bot";

export async function execute(client: Client, message: Message, args: string[]) {
    const sent = await message.reply('Pong!');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    await sent.edit(`Pong! \`${latency}ms\``);
}
