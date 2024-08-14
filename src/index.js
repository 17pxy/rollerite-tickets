const { Client, GatewayIntentBits, Partials, Collection, Colors, GuildMember} = require('discord.js')

const fs = require('fs');
const yaml = require('js-yaml');
const client = new Client({ intents: [		
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMembers, 
  GatewayIntentBits.GuildPresences, 
  GatewayIntentBits.GuildMessageReactions, 
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildVoiceStates] });

process.on('unhandledRejection', error => {
    console.error(error);
  });

client.on('shardError', error => {
    console.error(error);
  });
  
require('events').EventEmitter.defaultMaxListeners = 0;

  
client.commands = new Collection();
client.embeds = yaml.load(fs.readFileSync('src/data/settings/embeds.yml', 'utf8'));
client.config = yaml.load(fs.readFileSync('src/data/settings/config.yml', 'utf8'));
client.messages = yaml.load(fs.readFileSync('src/data/settings/messages.yml', 'utf8'));
client.buttons = yaml.load(fs.readFileSync('src/data/settings/buttons.yml', 'utf8'));
client.botconfig = client.config.BOT_CONFIG;

module.exports = client;

fs.readdirSync('./src/handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(client.config.BOT_CONFIG.TOKEN);