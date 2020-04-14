const routes = require('express').Router();
const fs = require('fs');

routes.get('/', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.render('subjects.ejs', {
            data: JSON.parse(data)
        });
    });
});

routes.get('/:id', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
        if (err) throw err;
        let file = JSON.parse(data);
        let cond = false;
        for (let i in file) {
            if (file[i].id == +req.params.id) {
                res.render('subjects.ejs', {
                    data: [file[i]]
                });
                cond = true;
                break;
            } 
        }
        if (cond == false) res.send('ID yang diinputkan tidak ada dalam data');
    })
});

module.exports = routes;