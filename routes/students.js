const { Router } = require('express');
const fs = require('fs');
const studentRoutes = Router();

studentRoutes.get('/', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let parse = JSON.parse(data);
            res.render('students.ejs', {
                object: parse
            });
        }
    });
});

studentRoutes.get('/add', (req, res) => {
    res.render('addstudent.ejs');
});

studentRoutes.post('/add', (req, res) => {
    // res.send(req.body);
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let parse = JSON.parse(data);
            let newStudent = req.body;
            parse.push({
                id: parse[parse.length - 1].id + 1,
                first_name: newStudent.first_name,
                last_name: newStudent.last_name,
                email: newStudent.email,
                gender: newStudent.gender,
                birth_date: newStudent.birth
            });

            fs.writeFile('./data/students.json', JSON.stringify(parse, null, 2), (err) => {
                if (err) {
                    res.send(
                        err
                    );
                } else {
                    res.redirect(
                        '/student'
                    );
                }
            });
        }
    });
});

studentRoutes.get('/:email', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let parse = JSON.parse(data);
            let result = [];
            for (let a = 0; a < parse.length; a++) {
                if (parse[a].email == req.params.email) {
                    result.push(parse[a]);
                    res.render('students.ejs', {
                        object: result
                    });
                    break;
                }
            }
        }
    });
});

studentRoutes.get('/:id/edit', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let parse = JSON.parse(data);
            for (let a = 0; a < parse.length; a++) {
                if (parse[a].id == req.params.id) {
                    res.render('editstudent.ejs', {
                        object: parse[a]
                    });
                    break;
                }
            }
        }
    });
});

studentRoutes.post('/:id/edit', (req, res) => {
    fs.readFile('./students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let newStudent = req.body;
            let parse = JSON.parse(data);
            for (let a = 0; a < parse.length; a++) {
                if (parse[a].id == req.params.id) {
                    parse[a] = {
                        id: parse[a].id,
                        first_name: newStudent.first_name,
                        last_name: newStudent.last_name,
                        email: newStudent.email,
                        gender: newStudent.gender,
                        birth_date: newStudent.birth_date
                    };
                    break;
                }
            }

            fs.writeFile('./data/students.json', JSON.stringify(parse, null, 2), (err) => {
                if (err) {
                    res.send(
                        err
                    );
                } else {
                    res.redirect(
                        '/student'
                    );
                }
            });
        }
    });
});

studentRoutes.get('/:id/delete', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(
                err
            );
        } else {
            let parse = JSON.parse(data);
            let newData = [];
            for (let a = 0; a < parse.length; a++) {
                if (parse[a].id == req.params.id) {
                    
                } else {
                    newData.push(parse[a]);
                }
            }

            fs.writeFile('./data/students.json', JSON.stringify(newData, null, 2), (err) => {
                if (err) {
                    res.send(
                        err
                    );
                } else {
                    res.redirect(
                        '/student'
                    );
                }
            });
        }
    });
});

module.exports = studentRoutes;
