const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;


// The `repy()` and `deferReply()` methods are initial responses
// they tell Discord that the bot has received the interaction

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

        async execute (interaction) {
			// ephemeral message means only the executor of the slash command can see the response. 
            await interaction.reply({content: 'secret pong!', ephemeral: true});
            await interaction.followUp('Pong again!');


            // Wait 2seconds and change the reply
            // await wait(2_000);
            // await interaction.editReply('Pong again!');

            // tell the user 'BOT is thinking...' before replying
            // await interaction.deferReply({ ephemeral: true });
            // await wait(4_000);
            // await interaction.editReply('Pong!');
        }
}