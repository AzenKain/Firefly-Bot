import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!");
export async function execute(client, interaction) {
    await interaction.reply("Pong!");
}
