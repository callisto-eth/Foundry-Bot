"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandsCollection = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
// Load Cogs
exports.commandsCollection = new discord_js_1.Collection();
const cmdFiles = (0, fs_1.readdirSync)("./build/Commands").filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
for (let cmdFile of cmdFiles) {
    const cmdName = cmdFile.split(".")[0];
    const cmd = require(`./Commands/${cmdName}`);
    exports.commandsCollection.set(cmdName, cmd);
}
client.on("ready", () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
});
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    const cmd = exports.commandsCollection.get(interaction.commandName);
    if (!cmd)
        return;
    cmd.run(interaction);
}));
client.login(process.env.BOT_TOKEN);
