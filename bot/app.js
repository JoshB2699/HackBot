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
});

//When a message is sent look if the message was a command and run it.
client.on('message', msg => {

  if (msg.content === config.commandPrefix + 'help') {
    require('./commands/help.js')(msg);
  }

});

client.login(config.botToken);
