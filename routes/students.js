const routes = require('express').Router();
const fs = require('fs');

routes.get('/', (req, res) => {
    res.send('data students');
});

routes.get('/:email', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if (err) throw err;
        let file = JSON.parse(data);
        for (let i in file) {
            if (file[i].email == req.params.email) {
                res.send(file[i]);
                break;
            } 
        }
        res.send('Email yang diinputkan tidak ada dalam data');
    })
});

module.exports = routes;