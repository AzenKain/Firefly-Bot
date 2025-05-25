import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { fetchApk } from "@/services/fetchApk";

export const data = new SlashCommandBuilder()
    .setName("apk")
    .setDescription("Fetch apk")
    .addStringOption((option) =>
        option
            .setName("version")
            .setDescription("Version of apk")
            .setRequired(true)
    )

export async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    const version = interaction.options.getString("version");
    await fetchApk(version, interaction);
}