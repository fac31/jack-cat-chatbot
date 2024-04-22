const { Events } = require('discord.js');
const {OpenAI} = require("openai");
const {openAI_KEY} = require("../config.js")


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
        // console.log('interaction.author.id', interaction.author.id)

        if (interaction.author.id !== `1231183898906726430`) {
            // console.log('interaction ', interaction)
            // console.log('user message/interaction.content', interaction.content)
            
            // Check if bot is mentioned in message
            if (interaction.content.includes(`1231183898906726430`)) {

                // console.log('interaction.reference ', interaction.channel.messages.cache.get(interaction.reference.messageId).author.id)
                console.log('INSIDE THE tag BLOCK ******',)
                    // console.log('TAG interaction content', interaction.reference.messageId)

                AI_res.then(data => {
                    // console.log('AI RESPONSE: ', data.choices[0].message)
                    interaction.reply(data.choices[0].message.content)
                    // return data;
                })
                // .then((r) => {
                    // console.log('r', r)
                //     if (!r.ok) throw new Error(`Error in AI call! Error: ${r.status}`)
                //     return r.json()
                // })
                .catch(err => console.log('catch error ', err))

            } else if (
                interaction.channel.messages.cache.get(interaction.reference) &&
                interaction.channel.messages.cache.get(interaction.reference.messageId).author.id === `1231183898906726430`) {
            // Or if it is a reply to a chatbot message
                AI_res.then(data => {
                    // console.log('AI RESPONSE: ', data.choices[0].message)
                    // console.log('interaction content', interaction.reference.messageId)
                    interaction.reply(data.choices[0].message.content)
                })
                .then((r) => {
                    if (!r.ok) throw new Error(`Error in AI call! Error: ${r.status}`)
                    return r.json()
                })
                .catch(err => console.log('catch error ', err))

            } else {
                console.log('******** no response necessary ********',)
                return;
            }
    
        }

    }
}