const {BOT_TOKEN, openAI_KEY} = require("./config.js");
const {OpenAI} = require("openai");
const API_URL = "https://api.openai.com/v1/chat/completions"
const {Client, GatewayIntentBits} = require("discord.js");
const { Models } = require("openai/resources/models.js");

const BOT = new Client(
    {intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,]}
);

const myClient = new OpenAI({apiKey: openAI_KEY})

BOT.once("ready", (response) => {console.log("my bot is online")});

BOT.on('messageCreate', (msg) => {
    
    if (msg.author !== BOT.user) {
        console.log('user message: ', msg.content)
        // console.log('myClient ', myClient)

        let AI_res = myClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", 
                "content": "You are a helpful assistant."},
                {"role": "user",
                "content": msg.content}, 
                {"role": "assistant",
                "content": "Hi there!"}
            ]}
        )
 
        AI_res.then(data => {
            // console.log('AI RESPONSE: ', data.choices[0].message.content)
            msg.reply(data.choices[0].message.content)
        })
    }
})

BOT.login(BOT_TOKEN);