const express = require("express");
const Discord = require("discord.js");
const { registerFont } = require("canvas");
const clientConfig = require("./config.js");
const connectDB = require("./DataBase/connect.js");

const app = express();
app.listen(3000, () => console.log(`Programmed By Royal Developers Team`));
app.get("/", (req, res) => res.send(`<h1>Programmed By Royal Developers Team</h1>`));

const client = new Discord.Client({ intents: 32767 });
client.config = clientConfig;
client.slashCommands = new Discord.Collection();
client.cooldownGames = new Discord.Collection();

registerFont("fonts/Cairo-Black.ttf", { family: "ahmed" });
registerFont("fonts/Cairo-Bold.ttf", { family: "ahmed" });
registerFont("fonts/Cairo-Regular.ttf", { family: "ahmed" });
registerFont("fonts/SansSerifBldFLF.otf", { family: "ahmed" });
registerFont("fonts/Roboto-Light.ttf", { family: "roboto" });

connectDB();

const handlerFiles = ["events", "slash"];
handlerFiles.forEach(p => {
  require(`./Handler/${p}`)(client);
});

process.on("unhandledRejection", (err) => {
  if (err.message.includes("The user aborted a request.") || err.message.includes("Unknown interaction")) return;
  console.log(err.stack);
});
process.on('warning', (warning) => {
  console.log(warning.stack);
});

client.login(process.env.token);
