const express = require('express');
const app = express.Router();
const model = require('../data/model');

app.get("/", (request, response) => {
    model.chats.findAll({ 
        where: {
        users: request.query.user
      }
    }).then(result => {
        return response.send(result);
    });
});

module.exports = app;