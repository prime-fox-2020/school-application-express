const {Client} = require('pg');

const client = new Client ({
    user: 'postgres',
    host: 'localhost',
    database: 'school',
    password: 'ArtiHidup102938',
    port: 5432
});

module.exports = client;