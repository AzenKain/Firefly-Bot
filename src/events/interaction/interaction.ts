import { ChatInputCommandInteraction, Client, Events, MessageFlags } from "discord.js";

export const name = Events.InteractionCreate;

export const once = false;

export async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.slash.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(client, interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "An error occurred while executing this command.",
                flags: MessageFlags.Ephemeral
            });
        } else {
            await interaction.reply({
                content: "An error occurred while executing this command.",
                flags: MessageFlags.Ephemeral
            });
        }

    }
}