const express = require('express');
const app = express.Router();

///Hubbies Payloads
function hubbiesData(){
    const data = [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "What are your favorite hobbies"
			},
			"accessory": {
				"type": "radio_buttons",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Football",
							"emoji": true
						},
						"value": "Football"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Music",
							"emoji": true
						},
						"value": "Music"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Sleep",
							"emoji": true
						},
						"value": "Sleep"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Movies",
							"emoji": true
						},
						"value": "Movies"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Basketball",
							"emoji": true
						},
						"value": "Basketball"
					}
				],
				"action_id": "radio_buttons-action"
			}
		},
		{
			"type": "divider"
		}
    ]
    
    return data;
}

//Mood Payload
function moodData(){
    const data = [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Welcome. How are you doing?"
			},
			"accessory": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Please Select Your mode",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Doing Well",
							"emoji": true
						},
						"value": "Doing Well"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Feeling Lucky",
							"emoji": true
						},
						"value": "Feeling Lucky"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Neutral",
							"emoji": true
						},
						"value": "Neutral"
					}
				],
				"action_id": "static_select-action"
			}
		},
		{
			"type": "divider"
		}
    ]
    
    return data;
}

//Time Section Payload
function timeData(){
    const data = [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "when are you free this week for a walk?"
			},
			"accessory": {
				"type": "radio_buttons",
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "12:00 Monday",
							"emoji": true
						},
						"value": "12:00 Monday"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "12:30 Tuesday",
							"emoji": true
						},
						"value": "12:30 Tuesday"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "13:00 Wednesday",
							"emoji": true
						},
						"value": "13:00 Wednesday"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "13:30 Thursday",
							"emoji": true
						},
						"value": "13:30 Thursday"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "14:00 Friday",
							"emoji": true
						},
						"value": "14:00 Friday"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "14:30 Saturday",
							"emoji": true
						},
						"value": "14:30 Saturday"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "15:00 Sunday",
							"emoji": true
						},
						"value": "15:00 Sunday"
					}
				],
				"action_id": "radio_buttons-action"
			}
		}
    ]
    
    return data;
}

//Number Scale Payload
function numberScale(){
    const data = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "What are the first 3 digits on the number scale?"
			}
		}
    ]
    
    return data;
}


//Final Response Payload
function finalResponse(){
    const data = [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Thank"
			}
		}
    ]
    
    return data;
}

module.exports = { finalResponse, timeData, moodData, hubbiesData, numberScale }