const client = require("..");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js');
const ticketModel = require("../data/models/ticketModel");

async function openTicket(interaction){

    interaction.reply({
        embeds: [
            new EmbedBuilder()
            .setColor('Orange')
            .setDescription('Creating ticket...')
        ], ephemeral: true
    })

    const ticketOpenEmbed = new EmbedBuilder()
.setColor(client.botconfig.EMBED_COLOR)
.setTitle(`Ticket System`)
.setDescription(`Welcome to your ticket ${interaction.user}`)

const ticketButtons = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
  .setCustomId('closeButton')
  .setLabel(`${client.buttons.TICKET_BUTTONS.CLOSE.label}`)
  .setStyle(`${client.buttons.TICKET_BUTTONS.CLOSE.style}`)
  .setEmoji(`${client.buttons.TICKET_BUTTONS.CLOSE.emoji}`),
)

interaction.guild.channels.create({
name: `${client.config.TICKET.SETTINGS.OPEN_NAME}`.replace("<userName>", `${interaction.user.username}`),
type: 0,
parent: client.config.TICKET.SETTINGS.CATEGORY_OPEN,
permissionOverwrites: [
  {id: interaction.guild.id, deny: ["ViewChannel"]}, 
  {id: interaction.user.id, allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "EmbedLinks"]},
  {id: client.config.TICKET.ROLES.ACCESS, allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "EmbedLinks"]}
],
topic: interaction.user.id
}).then(async c => {

const createdButtons = new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setStyle('Link')
.setLabel(`Go To Ticket`)
.setURL(`https://discord.com/channels/${interaction.guild.id}/${c.id}`)
)

ticketModel.create({
    userID: interaction.user.id,
    channel: c.id,
});

const createdEmbed = new EmbedBuilder()
.setColor('Green')
.setDescription(`Ticket created successfully!`)

interaction.editReply({ embeds: [createdEmbed], components: [createdButtons], ephemeral: true });
c.send({ content: `${interaction.user}` ,embeds: [ticketOpenEmbed], components: [ticketButtons] })

})
}


module.exports = {
    openTicket,
}