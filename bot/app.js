const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");

const config = require('./config/config.js');

mongoose.connect(config.dbURL, {
  user: 'hackBot',
  pass: 'hackSoc'
});

mongoose.set('debug', true);

//Connect to Discord.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ status: 'online', game: { name: config.commandPrefix + 'help for commands' } });
});

//When a message is sent look if the message was a command and run it.
client.on('message', msg => {

  if (msg.content === config.commandPrefix + 'help') {
    require('./commands/help.js')(msg);
  }

});

client.on("guildMemberAdd", (member) => {
  member.send("Please private message anyone with the Administrator or Committee role to confirm your membership!");
});

client.login(config.botToken);
