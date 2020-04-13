'use strict';
const routes = require('express').Router();
const fs = require('fs');

routes.get('/', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) res.send('err');
        else res.send(data);
    })
});

routes.get('/:email', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, datas) => {
        if (err) res.send('err');
        else 
            datas = JSON.parse(datas);
            let dataSelected;
            for (let data of datas) data.email == req.params.email ? dataSelected = data : '';
            res.send(dataSelected);
    })
});

module.exports = routes;