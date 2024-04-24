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
        .setName('secret-ping')
        .setDescription('Replies with an ephemeral Pong!'),

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
                ephemeral: true,
                components: [row]
            })

            console.log('interaction.user.username', interaction.user.username)

            const collectorFilter = b => b.user.id === interaction.user.id

            try {
                const confirmation = await response.awaitMessageComponent({ 
                    filter: collectorFilter,
                    time: 60_000
                })
            
                console.log('confirmation.customId ', confirmation.customId)

                // Update bot response once buttons are clicked. 
                if (confirmation.customId === 'confirm') {
                    await confirmation.update({content: 'Secret Pong!', ephemeral: true, components: []})
                } else if (confirmation.customId === 'cancel') {
                    await confirmation.update({content: 'Game cancelled!', ephemeral: true, components: []})
                }
            } catch (e) {
                await interaction.editReply({ 
                    content: 'No response received within one minute. Cancelling.',
                    components: [] 
                })
            }
        }
}