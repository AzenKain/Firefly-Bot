import axios from "axios";
import { ChatInputCommandInteraction, EmbedBuilder, Message, MessageFlags } from "discord.js";

export async function fetchApk(version: string | undefined | null, req: ChatInputCommandInteraction | Message) {
    if (!version) {
        await req.reply({
            content: '❌ Please provide a version.',
            ephemeral: true,
        });
        return;
    }
    const t = Math.floor(Date.now() / 1000);
    const url = 'https://globaldp-beta-cn01.bhsr.com/query_dispatch';

    const params = {
        version: `CNBETAAndroid${version.replace(/\s+/g, "")}`,
        t: t.toString(),
        language_type: '3',
        platform_type: '3',
        channel_id: '1',
        sub_channel_id: '1',
        is_new_format: '1',
    };
    let sent;
    if (req instanceof Message) {
        sent = await req.reply({
            content: '🔄 Fetching APK...',
            flags: MessageFlags.SuppressNotifications
        });
    }

    try {
        const response = await axios.get(url, { params });
        const decoded = Buffer.from(response.data, 'base64').toString('utf-8');
        const match = decoded.match(/https?:\/\/[^\s\\"]+/);

        if (match) {
            const embed = new EmbedBuilder()
                .setTitle("📦 APK Download Link")
                .setDescription(`[Click here to download](${match[0]})`)
                .addFields({ name: "Version", value: version })
                .setColor("Random")
                .setTimestamp();

            await req.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setTitle("❌ No URL Found")
                .setDescription("No valid APK URL was found in the response.")
                .setColor("Red");

            await req.reply({ embeds: [embed] });
        }
    } catch (error: any) {
        console.error("❌ Error:", error.message);
        const embed = new EmbedBuilder()
            .setTitle("🚨 Error")
            .setDescription("An error occurred while fetching the APK.")
            .setColor("Red");

        await req.reply({ embeds: [embed] });
    }
    
    if (sent) {
        await sent.delete();
    }
}