'use strict';
const routes = require('express').Router();
const fs = require('fs');

routes.get('/', (req, res) => {
    fs.readFile('./teachers.json', 'utf8', (err, data) => {
        if (err) res.send('err');
        else res.send(data);
    })
});

module.exports = routes;