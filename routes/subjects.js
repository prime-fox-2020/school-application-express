const { Router } = require('express')
const fs = require('fs')

const subjectsRoute = Router()

subjectsRoute.get('/', (req, res) => {
    fs.readFile('./subjects.json', 'utf-8', (err, data) => {
        let parsedJson = JSON.parse(data);
        // res.send(parsedJson);
        res.render('subjects.ejs', {subjects: parsedJson});

    });
});

subjectsRoute.get('/:id', (req, res) => {
    fs.readFile('./subjects.json', 'utf-8', (err, data) => {
        let result = null;
        let parsedJson = JSON.parse(data);
        for(let i = 0; i < parsedJson.length; i++) {
            let subject = parsedJson[i];
            if(subject.id == req.params.id) {
                result = subject;
                break;
            }
        }
        if(result) {
            res.send(result);
        } else {
            res.send('Subject not found');
        }
    });
});

module.exports = subjectsRoute; 