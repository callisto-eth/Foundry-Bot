import { ChatInputCommandInteraction } from "discord.js";

export function run(interaction:ChatInputCommandInteraction){
    interaction.reply(`Pong ${interaction.user}!`)
}