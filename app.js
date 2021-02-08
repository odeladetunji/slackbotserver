const app = require('express')();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();
const rtmapi = require('@slack/rtm-api');
const webapi = require('@slack/web-api');
const rtm = new rtmapi.RTMClient(process.env.SLACK_OUT_TOKEN);
const web = new webapi.WebClient(process.env.SLACK_OUT_TOKEN);
const payloads = require('./data/slacksPayloads');

var allowCrossDomain = function(req, res, next) {
    
	if('GET' == req.method){ 
		res.set({
			'Access-Control-Allow-Origin': 'http://beloveddais.com'
		});
	}

	if('POST' == req.method){ 
		res.set({
			'Access-Control-Allow-Origin': 'http://beloveddais.com'
		});
	}
	 
	if('OPTIONS' == req.method){ 
		res.set({
			'Access-Control-Allow-Origin': 'http://beloveddias.com',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
		});
		
		res.sendStatus(200); 
	}

   next();

};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false })); // urlencoded form parser
app.use(bodyParser.json())  // json parser
app.use('*',cors());

rtm.start().catch(console.error);

rtm.on('ready', async () => {
	console.log('AutoBot has started!');
    sendMessage('#general', 'welcome all users');
});

rtm.on('slack_event', async (eventType, event) => {
	// console.log(eventType);
	console.log(event)
	if(event.type == "desktop_notification" && event.title == "eBot")
		sendMessageData(event.channel, payloads.moodData());
		
	if(event.type == 'block_actions' && event.actions != undefined)
		if(event.actions[0].placeholder.text == "Please Select Your mode")
		     sendMessageData(event.channel, payloads.timeData());
});

async function sendMessageData(channel, message){
	await web.chat.postMessage({
		channel: channel,
		blocks: message
	});
}

async function sendMessage(channel, message){
	await web.chat.postMessage({
		channel: channel,
		text: message
	});
}

app.post('/slackinterractions', (request, response) => {
     console.log(request.body);
});

server.listen(6000, function(){
	console.log('slack bot is listening');
});
