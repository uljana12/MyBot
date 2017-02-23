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

bot.dialog('/', function (session) {
    session.send("Hello World");
});

function getJSONDataFromUrl(){
    var query = "?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo";
    var options = {};
    options.url = "http://api.geonames.org";
    options.type = options.type || "json";
    options.path = "/citiesJSON" + query;
    options.headers = {Accept: "application/json"};


    var client = restify.createClient(options);

    client.get(options, function(err, req, res, data) {
        if (err) {
            console.log(err);
            return;
        }
        client.close();
        console.log(JSON.stringify(data));

        return JSON.stringify(data);
    });
}

getJSONDataFromUrl();