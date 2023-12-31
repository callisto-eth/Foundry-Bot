"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = exports.run = void 0;
const discord_js_1 = require("discord.js");
function run(interaction) {
    const embed = new discord_js_1.EmbedBuilder()
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
exports.run = run;
exports.description = "Pongs Everybody!";
