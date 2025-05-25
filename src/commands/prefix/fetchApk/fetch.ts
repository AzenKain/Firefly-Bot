import { Client, Message } from "discord.js";
import { fetchApk } from "@/services/fetchApk";

export const name = "apk";
export const description = "Fetch apk";

export async function execute(client: Client, message: Message, args: string[]) {
    const version = args[0];
    await fetchApk(version, message);
}