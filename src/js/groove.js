'use strict';

require('dotenv').config();
var request = require('request');

const baseUrl = 'https://api.groovehq.com/v1/';
const apiKey = process.env.GROOVE_KEY;

module.exports = {
    fetchTicket: function(number) {
        return new Promise((resolve, reject) => {

            let options = {
                url: `${baseUrl}tickets/${number}?access_token=${apiKey}`,
                headers: {
                    'Auth': `Bearer ${apiKey}`
                }
            };
            request(options, function(error, response, body){
            	if (error){
            		return reject('error connecting to Groove');
            	}

            	if (response.statusCode != 200){
            		return reject('did not get 200 from Groove');
            	}

            	let json = JSON.parse(body).ticket;

            	let customerLink = json.links.customer.href;

            	let message = {
            		messageCount: json.message_count,
            		email: customerLink.substring(customerLink.lastIndexOf('/') + 1)
            	};

            	return resolve(message);
            });
        });
    }
}
