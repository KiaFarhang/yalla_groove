'use strict';

const express = require('express');
const favicon = require('serve-favicon');

require('dotenv').config();

var app = express();

let options = {
    root: __dirname
};
// app.use(favicon(__dirname + '/dist/img/favicon.ico'));

app.use(express.static('dist'));


app.get('/', function(request, response) {
    res.sendfile('dist/index.html', options);
});

app.listen(8080);
