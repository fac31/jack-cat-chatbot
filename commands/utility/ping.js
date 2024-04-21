const { ButtonBuilder, 
    ButtonStyle, 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    ActionRowBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;


// The `repy()` and `deferReply()` methods are initial responses
// they tell Discord that the bot has received the interaction

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

        async execute (interaction) {		

        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm Pong')
            .setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel Pong')
			.setStyle(ButtonStyle.Secondary);
        
        const row = new ActionRowBuilder().addComponents(cancel, confirm);

        const response = await interaction.reply({
            content: `Are you sure you want to play?`,
            components: [row]
        })
        console.log('interaction.user.id', interaction.user.username)

        const collectorFilter = b => b.user.id === interaction.user.id

        try {
            const confirmation = await response.awaitMessageComponent({ 
                filter: collectorFilter,
                time: 60_000
            })
        
            console.log('confirmation.customId ', confirmation.customId)

            if (confirmation.customId === 'confirm') {
                await interaction.editReply('Pong!')
                console.log('edit to Pong!:');
            } else if (confirmation.customId === 'cancel') {
                await interaction.editReply('Game cancelled.')
            }
        } catch (e) {
            await interaction.editReply({ 
                content: 'No response received within one minute. Cancelling.',
                components: [] 
            })
        }


		// await interaction.reply({
		// 	content: `confirmed pong!`,
		// 	components: [row],
		// });

        // ephemeral message means only the executor of the slash command can see the response. 
        // await interaction.reply({content: 'secret pong!', ephemeral: true});
        // await interaction.followUp('Pong again!');


            // Wait 2seconds and change the reply
            // await wait(2_000);
            // await interaction.editReply('Pong again!');

            // tell the user 'BOT is thinking...' before replying
            // await interaction.deferReply({ ephemeral: true });
            // await wait(4_000);
            // await interaction.editReply('Pong!');
        }
}