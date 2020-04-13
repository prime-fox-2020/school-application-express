const { Router } = require('express');
const fs = require('fs');
const teacherRoutes = Router();

teacherRoutes.get('/', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let parse = JSON.parse(data);
            res.render('teachers.ejs', {
                object: parse
            });
        }
    });
});

teacherRoutes.get('/:id', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf-8', (err, data) => {
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
                    res.render('teachers.ejs', {
                        object: result
                    });
                    break;
                }
            }
        }
    });
});

module.exports = teacherRoutes;