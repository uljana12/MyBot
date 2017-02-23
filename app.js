var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================


bot.dialog('/', session => {
    session.send('How are you doing');
});

//=========================================================
// Bots Events
//=========================================================

// Sends greeting message when the bot is first added to a conversation
bot.on('conversationUpdate', message => {
    const reply = new builder.Message()
                    .address(message.address)
                    .text('Hi! I am a Bot. I can talk to you.');
                bot.send(reply);
                return;
});