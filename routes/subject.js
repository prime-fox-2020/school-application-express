const route = require('express').Router();
const fs = require('fs');

route.get('/', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            res.send(JSON.parse(data));
        }
    })
})

module.exports = route;