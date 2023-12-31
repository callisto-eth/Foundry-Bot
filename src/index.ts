import { Client, Collection, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load Cogs
export const commandsCollection: Collection<String, { run: Function }> =
  new Collection();
const cmdFiles = readdirSync("./build/Commands").filter(
  (file) => file.endsWith(".js") || file.endsWith(".ts")
);
for (let cmdFile of cmdFiles) {
  const cmdName = cmdFile.split(".")[0];
  const cmd = require(`./Commands/${cmdName}`);
  commandsCollection.set(cmdName, cmd);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = commandsCollection.get(interaction.commandName);
  if (!cmd) return;
  cmd.run(interaction);
});

client.login(process.env.BOT_TOKEN);
