const {Router} = require('express');
const fs = require('fs');
const subjectRoutes = Router();

subjectRoutes.get('/', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let parse = JSON.parse(data);
            res.render('subjects.ejs', {
                object: parse
            });
        }
    });
});

subjectRoutes.get('/:id', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let parse = JSON.parse(data);
            let result = [];
            for (let a = 0; a < parse.length; a++) {
                if (parse[a].id == req.params.id) {
                    result.push(parse[a]);
                    res.render('subjects.ejs', {
                        object: result
                    });
                    break;
                }
            }
        }
    });
});

module.exports = subjectRoutes;
