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
const fetchAllUsers = require('./routes/fetchAllChats');
const fetchAUsers = require('./routes/fetchAUserChats');
const fetchChatById = require('./routes/fetchChatById');

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

app.use('/fetchallusers', fetchAllUsers);
app.use('/fetchausers', fetchAUsers);
app.use('/fetchchatbyid', fetchChatById);

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

	if(data.actions != undefined && data.actions[0].placeholder != undefined)
		if(data.actions[0].placeholder.text == 'Please Select Your mode'){
			let message = {};
			message.user = data.user.username;
			message.answer = data.actions[0].selected_option.text.text;
			message.question = data.actions[0].placeholder.text;

			sendMessageData('#' + data.channel.name, payloads.timeData());
			saveChatInDataBase(message);
		}

    if(data.actions != undefined && data.actions[0].type == 'radio_buttons'){
		let message = {};
		message.user = data.user.username;
		message.answer = data.actions[0].selected_option.text.text;
		
		let question = data.actions[0].selected_option.text.text;
		switch(question){
			case "12:00 Monday":  
			    message.question = fetchQuestion(question);
		    	saveChatInDataBase(message);
	     		sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "12:30 Tuesday":  
		    	message.question = fetchQuestion(question);
		    	saveChatInDataBase(message);
		    	sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "13:00 Wednesday":  
		    	message.question = fetchQuestion(question);
		    	saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "13:30 Thursday":  
		    	message.question = fetchQuestion(question);
		     	saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "14:00 Friday":  
			    message.question = fetchQuestion(question);
			    saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "14:30 Saturday":  
			    message.question = fetchQuestion(question);
			    saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
				break;
			case "15:00 Sunday":  
		    	message.question = fetchQuestion(question);
		    	saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.hubbiesData());
			case "Football":  
		    	message.question = fetchQuestion(question);
			    saveChatInDataBase(message);
		    	sendMessageData('#' + data.channel.name, payloads.numberScale()); 
				break;
			case "Music":  
			    message.question = fetchQuestion(question);
		    	saveChatInDataBase(message);
		    	sendMessageData('#' + data.channel.name, payloads.numberScale());  
				break;
			case "Sleep":  
		    	message.question = fetchQuestion(question);
			    saveChatInDataBase(message);
			    sendMessageData('#' + data.channel.name, payloads.numberScale());  
				break;
			case "Movies": 
		    	message.question = fetchQuestion(question); 
			    saveChatInDataBase(message);
		    	sendMessageData('#' + data.channel.name, payloads.numberScale());  
				break;
			case "Basketball": 
			    message.question = fetchQuestion(question); 
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

function fetchQuestion(param){
	let questionAsked = "";
	switch(param){
		case "12:00 Monday":  
		    questionAsked = "when are you free this week for a walk";
			break;
		case "12:30 Tuesday":  
		    questionAsked = "when are you free this week for a walk";
			break;
		case "13:00 Wednesday":  
	    	questionAsked = "when are you free this week for a walk";
			break;
		case "13:30 Thursday":  
	    	questionAsked = "when are you free this week for a walk";
			break;
		case "14:00 Friday":  
	    	questionAsked = "when are you free this week for a walk";
			break;
		case "14:30 Saturday":  
		    questionAsked = "when are you free this week for a walk";
			break;
		case "15:00 Sunday":  
		    questionAsked = "when are you free this week for a walk";
		case "Football":  
			questionAsked = "What are your favorite hobbies"; 
			break;
		case "Music":  
		    questionAsked = "What are your favorite hobbies";   
			break;
		case "Sleep":  
		    questionAsked = "What are your favorite hobbies"; 
			break;
		case "Movies":  
		    questionAsked = "What are your favorite hobbies"; 
			break;
		case "Basketball":  
	     	questionAsked = "What are your favorite hobbies"; 
	}  

	return questionAsked;
}

server.listen(6000, function(){
	console.log('slack bot is listening');
});











