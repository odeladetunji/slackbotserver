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
const model = require('./data/model');

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

	let message = {};
    message.user = "users";
    message.answer = "answers";
	message.question = "questions";

	saveChatInDataBase(message);
	
});

rtm.on('slack_event', async (eventType, event) => {
	console.log(event)
	if(event.type == "desktop_notification" && event.title == "eBot"){
		let message = {};
        message.user = event.content.split(' ')[0].split('@')[1];
	    message.question = "@cBot";
        message.answer = '';
		sendMessageData(event.channel, payloads.moodData());
		saveChatInDataBase(message);
	}
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
	const data = JSON.parse(request.body.payload);
	console.log(data);
	let message = {};
    message.user = data.user.username;
    message.answer = data.actions[0].selected_option.text.text;
    message.question = data.actions[0].placeholder.text;

	if(data.actions != undefined && data.actions[0].placeholder != undefined)
		if(data.actions[0].placeholder.text == 'Please Select Your mode'){
			sendMessageData('#' + data.channel.name, payloads.timeData());
			saveChatInDataBase(message);
		}

       if(data.actions != undefined && data.actions[0].type == 'radio_buttons'){
		switch(data.actions[0].selected_option.text.text){
			case "12:00 Monday":  
		    	saveChatInDataBase(message);
	     		sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "12:30 Tuesday":  
		    	saveChatInDataBase(message);
		    	sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "13:00 Wednesday":  
		    	saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "13:30 Thursday":  
		     	saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "14:00 Friday":  
			    saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "14:30 Saturday":  
			    saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "15:00 Sunday":  
		    	saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
            case "Football":  
			    saveChatInDataBase(message);
		    	sendMessageData('#' + data.channel.name, payloads.numberScale()); 
				break;
			case "Music":  
		    	saveChatInDataBase(message);
		    	sendMessageData('#' + data.channel.name, payloads.numberScale());  
				break;
			case "Sleep":  
			    saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.numberScale());  
				break;
			case "Movies":  
			    saveChatInDataBase(message);
		    	sendMessageData('#' + data.channel.name, payloads.numberScale());  
				break;
			case "Basketball":  
			    saveChatInDataBase(message);
				sendMessageData('#' + data.channel.name, payloads.numberScale()); 
		}  
	}
});

function saveChatInDataBase(message){
	model.chats.create({
		users: message.user,
		questions: message.question,
		answers: message.answer
	  }).then(resp => { 
		console.log(resp)
	  }, err => {
		console.log(err)
	  });
}

server.listen(6000, function(){
	console.log('slack bot is listening');
});











