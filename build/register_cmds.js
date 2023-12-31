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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const discord_js_2 = require("discord.js");
dotenv_1.default.config();
const commands = new discord_js_2.Collection();
const cmdFiles = (0, fs_1.readdirSync)("./build/Commands").filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
for (let cmdFile of cmdFiles) {
    const cmdName = cmdFile.split(".")[0];
    const cmd = require(`./Commands/${cmdName}`);
    commands.set(cmdName, { name: cmdName, description: cmd.description });
}
const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.BOT_TOKEN || "");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Started refreshing application (/) commands.");
            yield rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID || ""), {
                body: commands,
            });
            console.log("Successfully reloaded application (/) commands.");
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
