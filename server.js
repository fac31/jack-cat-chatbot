const {BOT_TOKEN} = require("./bot-token.js");
const {Client, GatewayIntentBits} = require("discord.js");

const BOT = new Client(
    {intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,]}
);

BOT.on("ready", (response) => {console.log("my bot is online")});
BOT.login(BOT_TOKEN);