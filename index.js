const {BOT_TOKEN, openAI_KEY} = require("./config.js");
const {OpenAI} = require("openai");
const API_URL = "https://api.openai.com/v1/chat/completions"
const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");
const { Models } = require("openai/resources/models.js");
const fs = require('node:fs')
const path = require('node:path')


const BOT = new Client(
    {intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,]}
);

BOT.commands = new Collection()


const myClient = new OpenAI({apiKey: openAI_KEY})


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

BOT.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

BOT.on(Events.InteractionCreate, async interaction => {
    
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.log(`No command matching ${interaction.commandName} was found.`)
        return;
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.log(error)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true})
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true})
        }
    }



    console.log(interaction)
})



BOT.once(Events.ClientReady, readyClient => console.log(`Ready! Logged in as ${readyClient.user.tag}`));

BOT.on('messageCreate', (msg) => {
    
    if (msg.author !== BOT.user) {
        // console.log('msg content ', msg)
        console.log('user message: ', msg.content)
        
        // Check if bot is mentioned in message
        if (msg.content.includes(`@1227708046810284172`) 
        || 
        // Or if it is a reply to a chatbot message
        (msg.channel.messages.cache.get(msg.reference.messageId).author.id === `1227708046810284172`)
            ) {


            let AI_res = myClient.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {"role": "system", 
                    "content": "You are a helpful assistant. You should reply in a sarcastic manner."},
                    {"role": "user",
                    "content": msg.content}, 
                    {"role": "assistant",
                    "content": "Hi there!"}
                ]}
            )
    
            AI_res.then(data => {
                console.log('AI RESPONSE: ', data.choices[0].message)
                // console.log('msg content', msg.reference.messageId)
                msg.reply(data.choices[0].message.content)


            })
            .then((r) => {
                if (!r.ok) throw new Error(`Error in AI call! Error: ${r.status}`)
                return r.json()
            })
            .catch(err => console.log('catch error ', err))
        }

    }
}
)

BOT.login(BOT_TOKEN);