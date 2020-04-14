const routes = require('express').Router();
const fs = require('fs');

routes.get('/', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.render('students.ejs', {
            data: JSON.parse(data)
        });
    });
});

routes.get('/:email', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if (err) throw err;
        let file = JSON.parse(data);
        let cond = false;
        for (let i in file) {
            if (file[i].email == req.params.email) {
                res.render('students.ejs', {
                    data: [file[i]]
                });
                cond = true;
                break;
            } 
        }
        if (cond == false) res.send('Email yang diinputkan tidak ada dalam data');
    })
});

module.exports = routes;