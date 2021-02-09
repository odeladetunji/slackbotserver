const express = require('express');
const app = express.Router();
const model = require('../data/model');

app.get("/", (request, response) => {
    model.chats.findAll({ 
        where: {
        id: request.query.id
      }
    }).then(result => {
        return response.send(result);
    });
});

module.exports = app;