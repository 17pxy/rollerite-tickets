const { ApplicationCommandType, ActionRowBuilder, EmbedBuilder, ButtonBuilder, StringSelectMenuBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ticket-send_panel',
    description: "Send ticket panel.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'channel',
            description: 'Channel to send ticket panel',
            type: ApplicationCommandOptionType.Channel,
            required: false
        }
        ],

    run: async (client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `${client.messages.NO_PERMS}`, ephemeral: true });

    const sendChannel = interaction.options.getChannel('channel') || interaction.channel;

    const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId("openTicket")
        .setStyle("Primary")
        .setEmoji("🎫")
        .setLabel("Open Ticket")
    )
        const panelEmbed = new EmbedBuilder()
        .setColor(client.botconfig.EMBED_COLOR)
        .setTitle(`Tickets`)
        .setDescription(`To open a ticket click on the button below`)

        sendChannel.send({ embeds: [panelEmbed], components: [button] }) ;
        interaction.reply({ content: `Panel sent correctly to ${sendChannel}`, ephemeral: true });


    }
};