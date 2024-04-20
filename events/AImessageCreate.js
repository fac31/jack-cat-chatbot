const { Events } = require('discord.js');
const {OpenAI} = require("openai");


// module.exports = {
//     name: Events.MessageCreate,
//     async execute(interaction) {

//         const myClient = new OpenAI({apiKey: openAI_KEY})

//         if (interaction.author !== BOT.user) {
//             // console.log('interaction content ', interaction)
//             console.log('user message: ', interaction.content)
            
//             // Check if bot is mentioned in message
//             if (interaction.content.includes(`@1227708046810284172`) 
//             || 
//             // Or if it is a reply to a chatbot message
//             (interaction.channel.messages.cache.get(interaction.reference.messageId).author.id === `1227708046810284172`)
//                 ) {
    
    
//                 let AI_res = myClient.chat.completions.create({
//                     model: "gpt-3.5-turbo",
//                     messages: [
//                         {"role": "system", 
//                         "content": "You are a helpful assistant. You should reply in a sarcastic manner."},
//                         {"role": "user",
//                         "content": interaction.content}, 
//                         {"role": "assistant",
//                         "content": "Hi there!"}
//                     ]}
//                 )
        
//                 AI_res.then(data => {
//                     console.log('AI RESPONSE: ', data.choices[0].message)
//                     // console.log('interaction content', interaction.reference.messageId)
//                     msg.reply(data.choices[0].message.content)
    
    
//                 })
//                 .then((r) => {
//                     if (!r.ok) throw new Error(`Error in AI call! Error: ${r.status}`)
//                     return r.json()
//                 })
//                 .catch(err => console.log('catch error ', err))
//             }
    
//         }

//     }
// }
// BOT.on('messageCreate', (msg) => {
    

// }
// )