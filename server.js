'use strict';

const express = require('express');

var bodyParser = require('body-parser');


require('dotenv').config();

const database = require('./src/js/database.js');
const groove = require('./src/js/groove.js');
const yalla = require('./src/js/yalla.js');

var app = express();
app.use(bodyParser.json());

let options = {
    root: __dirname
};

app.post('/', function(request, response) {

    console.log('new request received');

    let ticket = request.body.number;

    response.send('Thanks!');

    setTimeout(function() {
        groove.fetchTicket(ticket).then(function(result) {
            if (result.messageCount == 1 && result.state == 'opened') {
                database.checkForEmail(result).then(function(result) {
                    yalla.sendPriority(result).then(function(result) {
                        if (result === true) {
                            console.log('Successfully sent priority');
                        };
                    });
                });
            }
        }).catch(function(reason) {
            console.log(`Error: ${reason}`);
        });
    }, 600000);
});

app.listen(8080);
