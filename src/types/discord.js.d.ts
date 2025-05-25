import { Collection, Client as BaseClient, SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface slashCommand {
  data: SlashCommandBuilder;
  execute: (client: BaseClient, interaction: CommandInteraction) => Promise<void>;
}

export interface prefixCommand {
    name: string;
    description: string;
    execute: (client: Client, message: Message, args: string[]) => Promise<void>;
}

declare module "discord.js" {
  interface Client {
    slash: Collection<string, slashCommand>;
    prefix: Collection<string, prefixCommand>;
  }
}