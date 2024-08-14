const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ActionRow } = require('discord.js');
const client = require('..');

client.on("interactionCreate", async interaction => {
    if(interaction.isButton()){ 

    switch(interaction.customId){
        case "closeButton":
            const confirmEmbed = new EmbedBuilder()
            .setColor(client.botconfig.EMBED_COLOR)
            .setDescription(`What do you want?`)
        
            const confirmButtons = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId('yesClose')
                .setStyle(`${client.buttons.TICKET_BUTTONS.CONFIRM_CLOSE.style}`)
                .setLabel(`${client.buttons.TICKET_BUTTONS.CONFIRM_CLOSE.label}`)
                .setEmoji(`${client.buttons.TICKET_BUTTONS.CONFIRM_CLOSE.emoji}`),
                new ButtonBuilder()
                .setCustomId('noClose')
                .setStyle(`${client.buttons.TICKET_BUTTONS.CANCEL_CLOSE.style}`)
                .setLabel(`${client.buttons.TICKET_BUTTONS.CANCEL_CLOSE.label}`)
                .setEmoji(`${client.buttons.TICKET_BUTTONS.CANCEL_CLOSE.emoji}`)
            )
        
            interaction.reply({ embeds: [confirmEmbed], components: [confirmButtons] })
            
        break;
        case "yesClose":

        interaction.message.delete();

    setTimeout(() => {
        interaction.channel.delete();
    }, 3000);
    
        break;
        case "noClose":

        interaction.message.delete();

        break;
    }

    }


});
