const {BOT_TOKEN, openAI_KEY} = require("./config.js");
const {OpenAI} = require("openai");
const API_URL = "https://api.openai.com/v1/chat/completions"
const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");
const { Models } = require("openai/resources/models.js");
const fs = require('node:fs')
const path = require('node:path')


// const myClient = new OpenAI({apiKey: openAI_KEY})

const BOT = new Client(
    {intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,]}
);

BOT.commands = new Collection()

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			BOT.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events')
// returns an array of all the file names in the given directory and 
// filters for only .js files. 
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    // callback function passed takes argument(s) returned by its respective event,
    // collects them into an array & then calls execute on the argument array. 
    if (event.once) {
        BOT.once(event.name, (...args) => event.execute(...args))
    } else {
        BOT.on(event.name, (...args) => event.execute(...args))
    }
}


// BOT.on('messageCreate', (msg) => {
    
//     if (msg.author !== BOT.user) {
//         // console.log('msg content ', msg)
//         console.log('user message: ', msg.content)
        
//         // Check if bot is mentioned in message
//         if (msg.content.includes(`@1227708046810284172`) 
//         || 
//         // Or if it is a reply to a chatbot message
//         (msg.channel.messages.cache.get(msg.reference.messageId).author.id === `1227708046810284172`)
//             ) {


//             let AI_res = myClient.chat.completions.create({
//                 model: "gpt-3.5-turbo",
//                 messages: [
//                     {"role": "system", 
//                     "content": "You are a helpful assistant. You should reply in a sarcastic manner."},
//                     {"role": "user",
//                     "content": msg.content}, 
//                     {"role": "assistant",
//                     "content": "Hi there!"}
//                 ]}
//             )
    
//             AI_res.then(data => {
//                 console.log('AI RESPONSE: ', data.choices[0].message)
//                 // console.log('msg content', msg.reference.messageId)
//                 msg.reply(data.choices[0].message.content)


//             })
//             .then((r) => {
//                 if (!r.ok) throw new Error(`Error in AI call! Error: ${r.status}`)
//                 return r.json()
//             })
//             .catch(err => console.log('catch error ', err))
//         }

//     }
// }
// )

BOT.login(BOT_TOKEN);