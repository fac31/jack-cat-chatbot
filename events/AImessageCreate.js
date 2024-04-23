const { Events } = require('discord.js');
const {OpenAI} = require("openai");
const {openAI_KEY,clientId} = require("../config.js")


module.exports = {
    name: Events.MessageCreate,

    async execute(interaction) {

        const myClient = new OpenAI({apiKey: openAI_KEY})
        
        let AI_res = myClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", 
                "content": "You are a helpful assistant. You should reply in a sarcastic manner."},
                {"role": "user",
                "content": interaction.content}, 
                {"role": "assistant",
                "content": "Hi there!"}
            ]}
        )
        if (interaction.author.id !== clientId.toString()) {
            // Check if bot is mentioned in message
            if (interaction.content.includes(clientId.toString())) {
                AI_res.then(data => {
                    interaction.reply(data.choices[0].message.content)
                })
                .catch(err => console.log('catch error ', err))
            } else if (
                interaction.reference !== null && 
                interaction.channel.messages.cache.get(interaction.reference.messageId).author.id === "1231183898906726430") {
                // Or if it is a reply to a chatbot message
                AI_res.then(data => {
                    interaction.reply(data.choices[0].message.content)
                })
                .catch(err => console.log('catch error ', err))
            }
        }

    }
}