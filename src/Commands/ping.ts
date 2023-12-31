import { ChatInputCommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";

export function run(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setColor(0x380444)
    .setTitle("Pong!")
    .setAuthor({ name: "Foundry Bot" })
    .addFields([
      {
        name: "Latency:",
        value: `${Date.now() - interaction.createdTimestamp}ms`,
      },
    ]);

  interaction.reply({ embeds: [embed] });
}

export const description = "Pongs Everybody!";
