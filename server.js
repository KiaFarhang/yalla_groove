'use strict';

const express = require('express');

require('dotenv').config();

const database = require('./src/js/database.js');
const groove = require('./src/js/groove.js');

var app = express();

let options = {
    root: __dirname
};

// app.use(express.static('dist'));


// app.get('/', function(request, response) {
//     // res.sendfile('dist/index.html', options);
// });

// app.listen(8080);


let ticketExists;

groove.fetchTicket(1667).then(function(result){
	ticketExists = result;
	console.log(ticketExists);
	// console.log(ticketExists[message_count]);
}).catch(function(error) {

});
