const express = require('express');
const app = express.Router();
const model = require('../data/model');

app.get("/", (request, response) => {
    model.chats.findAll({limit: 20, offSet: 0}).then(result => {
        return response.send(result);
    })
});

module.exports = app;