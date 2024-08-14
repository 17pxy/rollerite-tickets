const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, PermissionsBitField} = require('discord.js');
const client = require('..');
const ticketDB = require('../data/models/ticketModel');
const { openTicket } = require('../functions/openTicket');

client.on("interactionCreate", async (interaction) => {
    if(interaction.isButton()) {
      if(interaction.customId == "openTicket"){
       openTicket(interaction)
      }
    }
})