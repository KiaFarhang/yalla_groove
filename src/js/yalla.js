'use strict';

require('dotenv').config();
var request = require('request');

const baseUrl = 'https://www.yallahq.com/api/v1/priority';
const apiKey = process.env.YALLA_KEY;

module.exports = {
    sendPriority: function(message) {
        return new Promise((resolve, reject) => {

            let priorityTitle = `Respond to ${message.email} in Groove`;
            let priorityDescription = `Check Groove by following this link: https://lemonadestandinc.groovehq.com/groove_client/`;

            let options = {
                url: `${baseUrl}`,
                headers: {
                    'API_KEY': apiKey,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: `title=${priorityTitle}&description=${priorityDescription}&user_id=${message.manager}`
            };

            request(options, function(error, response, body) {
                if (error) {
                    return reject('error connecting to Yalla');
                }

                if (response.statusCode != 200) {
                    return reject('did not get 200 from Yalla');
                }

                return resolve(true);
            });
        });
    }
}
