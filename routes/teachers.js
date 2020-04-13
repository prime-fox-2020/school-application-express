const routes = require('express').Router();
const fs = require('fs');

routes.get('/', (req, res) => {
    res.send('data teachers');
});

routes.get('/:id', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
        if (err) throw err;
        let file = JSON.parse(data);
        for (let i in file) {
            if (file[i].id == +req.params.id) {
                res.send(file[i]);
                break;
            } 
        }
        res.send('Id yang diinputkan tidak ada dalam data');
    })
});

module.exports = routes;