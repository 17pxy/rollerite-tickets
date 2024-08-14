const { ApplicationCommandType, ActionRowBuilder, EmbedBuilder, ButtonBuilder, StringSelectMenuBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { openTicket } = require('../../functions/openTicket');

module.exports = {
    name: 'ticket-open',
    description: "Open ticket.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        openTicket(interaction);
    }
};