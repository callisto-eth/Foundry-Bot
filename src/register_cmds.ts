import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { readdirSync } from "fs";
import { Collection } from "discord.js";
dotenv.config();

const commands = new Collection();

const cmdFiles = readdirSync("./build/Commands").filter(
  (file) => file.endsWith(".js") || file.endsWith(".ts")
);
for (let cmdFile of cmdFiles) {
  const cmdName = cmdFile.split(".")[0];
  const cmd = require(`./Commands/${cmdName}`);
  commands.set(cmdName, { name: cmdName, description: cmd.description });
}

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN || "");

async function main() {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID || ""), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

main();
