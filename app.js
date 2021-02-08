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
		
	// if(event.type == 'block_actions' && event.actions != undefined)
	// 	if(event.actions[0].placeholder.text == "Please Select Your mode")
	// 	     sendMessageData(event.channel, payloads.timeData());
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
<<<<<<< HEAD
	 // console.log(JSON.parse(request.body.payload).actions[0].placeholder);
	 const data = JSON.parse(request.body.payload);
	 console.log(data);

	 if(data.actions != undefined && data.actions[0].placeholder != undefined)
			 if(data.actions[0].placeholder.text == 'Please Select Your mode') 
				 sendMessageData('#' + data.channel.name, payloads.timeData());

	if(data.actions != undefined && data.actions[0].type == 'radio_buttons'){
=======
	// console.log(JSON.parse(request.body.payload).actions[0].placeholder);
	const data = JSON.parse(request.body.payload);
        console.log(data);
        //console.log(JSON.parse(request.body.payload.event));
	if(data.actions != undefined && data.actions[0].placeholder != undefined)
		if(data.actions[0].placeholder.text == 'Please Select Your mode')
                    //console.log(data.channel.id); console.log("pppppppppppppppp");  
		    sendMessageData('#' + data.channel.name, payloads.timeData());

       if(data.actions != undefined && data.actions[0].type == 'radio_buttons'){
>>>>>>> ebb223b8f4eb837697a91b65d086ae9302af08c8
		switch(data.actions[0].selected_option.text.text){
			case "12:00 Monday":  
				sendMessageData('#' + data.channel.name, payloads.hubbiesData()); 
				break;
			case "12:30 Tuesday":  
				sendMessageData('#' + data.channel.name, payloads.hubbiesData()); 
				break;
			case "13:00 Wednesday":  
				sendMessageData('#' + data.channel.name, payloads.hubbiesData()); 
				break;
			case "13:30 Thursday":  
				sendMessageData('#' + data.channel.name, payloads.hubbiesData()); 
				break;
			case "14:00 Friday":  
				sendMessageData('#' + data.channel.name, payloads.hubbiesData()); 
				break;
			case "14:30 Saturday":  
				sendMessageData('#' + data.channel.name, payloads.hubbiesData()); 
				break;
			case "15:00 Sunday":  
<<<<<<< HEAD
				sendMessageData('#' + data.channel.name, payloads.hubbiesData()); 
				break;
			
			case "Football":  
=======
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
                        case "Football":  
>>>>>>> ebb223b8f4eb837697a91b65d086ae9302af08c8
				sendMessageData('#' + data.channel.name, payloads.numberScale()); 
				break;
			case "Music":  
				sendMessageData('#' + data.channel.name, payloads.numberScale()); 
				break;
			case "Sleep":  
				sendMessageData('#' + data.channel.name, payloads.numberScale()); 
				break;
			case "Movies":  
				sendMessageData('#' + data.channel.name, payloads.numberScale()); 
				break;
			case "Basketball":  
<<<<<<< HEAD
				sendMessageData('#' + data.channel.name, payloads.numberScale());  
		} 
=======
				sendMessageData('#' + data.channel.name, payloads.numberScale()); 
		}  
>>>>>>> ebb223b8f4eb837697a91b65d086ae9302af08c8
	}
	

});

server.listen(6000, function(){
	console.log('slack bot is listening');
});
