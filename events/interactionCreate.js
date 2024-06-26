const { Events } = require('discord.js');

module.exports = {
	//	Executes code when the bot recieves an interaction
	name: Events.InteractionCreate,
	async execute(interaction) {
		//	Checks interaction to make sure it is a slash command
		if (!interaction.isChatInputCommand()) return;

		//	Gets the interactions corresponding slash command;
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			//	Executes slash command
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
			// ephemeral message means only the executor of the slash command can see the response. 
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			}
			else { 
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};