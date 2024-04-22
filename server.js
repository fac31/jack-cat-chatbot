const {BOT_TOKEN} = require("./config.js");git 
const {openAI} = require("openai");
const {Client, GatewayIntentBits} = require("discord.js");

const BOT = new Client(
    {intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,]}
);

BOT.once("ready", (response) => {console.log("my bot is online")});

BOT.on('messageCreate', (msg) => {
    console.log('user message: ', msg.content)
    
    if (msg.author !== BOT.user) {
        msg.channel.send('howdy!')
}
})

BOT.login(BOT_TOKEN);   