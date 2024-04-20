const { Events } = require('discord.js');

module.exports = {
    // Name states which event this file is for
	name: Events.ClientReady,
    // Specifies the value should only run once. 
	once: true,
    // Event logic
    // Will be called by the event handler whenever the event emits. 
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};