'use strict';

let pg = require('pg');
require('dotenv').config();

let pgConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutMillis: 30000
};

let pool = new pg.Pool(pgConfig);

module.exports = {
    checkForEmail: function(message) {
        return new Promise((resolve, reject) => {
            pool.connect(function(error, client, done) {
                if (error) {
                    return reject('could not connect to db');
                }
                client.query(`SELECT mgr FROM clients WHERE email @> '{"${message.email}"}'`, function(error, result) {
                    done();
                    if (error) {
                        return reject('error querying DB');
                    }

                    if(result.rows.length == 0){
                        message.manager = 'uMpU6Mn4GwXc2';
                        return resolve(message);
                    }

                    message.manager = result.rows[0].mgr;
                    return resolve(message);
                });
            });
        });
    }
}
