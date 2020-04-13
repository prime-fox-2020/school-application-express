const { Router } = require('express');
const fs = require('fs');

const studentsRouter = Router();

studentsRouter.get('/', (req, res) => {
    fs.readFile('./students.json', 'utf-8', (err, data) => {
        if(err) {
            res.send(err);
        } else {
            let parsedJson = JSON.parse(data);
            res.render('students.ejs', {students: parsedJson});
        }
    });
});

studentsRouter.get('/add', (req, res) => {
    res.render('addStudents.ejs', {mode: 'add'});
});

studentsRouter.post('/add', (req, res) => {
    console.log(req.body);
    fs.readFile('./students.json', 'utf-8', (err, data) => {
        if(err) {
            res.send(err);
        }
        else {
            let parsedJson = JSON.parse(data);
            let newId = parsedJson[parsedJson.length - 1].id + 1;
            let newStudent = req.body;
            parsedJson.push({
                id: newId,
                first_name: newStudent.first_name,
                last_name: newStudent.last_name,
                email: newStudent.email,
                gender: newStudent.gender,
                birth_date: newStudent.birth_date
            });

            fs.writeFile('./students.json', JSON.stringify(parsedJson, null, 4), (err) => {
                if(err) {
                    res.send(err);
                } else {
                    res.redirect('/students');
                }
            });
        }
    });
});

studentsRouter.get('/:email', (req, res) => {
    fs.readFile('./students.json', 'utf-8', (err, data) => {
        if(err) {
            res.send(err);
        } else {
            let result = null;
            let parsedJson = JSON.parse(data);
            for(let i = 0; i < parsedJson.length; i++) {
                let student = parsedJson[i];
                if(student.email === req.params.email) {
                    result = student;
                    break;
                }
            }
            if(result) {
                res.send(result);
            } else {
                res.send('Student not found');
            }
        }
    });
});

studentsRouter.get('/:id/edit', (req, res) => {
    fs.readFile('./students.json', 'utf-8', (err, data) => {
        if(err) {
            res.send(err);
        } else {
            let result = null;
            let parsedJson = JSON.parse(data);
            for(let i = 0; i < parsedJson.length; i++) {
                let student = parsedJson[i];
                if(student.id === Number(req.params.id)) {
                    result = student;
                    break;
                }
            }
            if(result) {
                res.render('addStudents.ejs', {student: result, mode: 'edit'});
            } else {
                res.send('Student not found');
            }
        }
    });
});

studentsRouter.post('/:id/edit', (req, res) => {
    fs.readFile('./students.json', 'utf-8', (err, data) => {
        if(err) {
            res.send(err);
        } else {
            let result = null;
            let parsedJson = JSON.parse(data);
            for(let i = 0; i < parsedJson.length; i++) {
                let student = parsedJson[i];
                if(student.id === Number(req.params.id)) {
                    result = student;
                    let newStudent = req.body;
                    parsedJson[i] = {
                        id: student.id,
                        first_name: newStudent.first_name,
                        last_name: newStudent.last_name,
                        email: newStudent.email,
                        gender: newStudent.gender,
                        birth_date: newStudent.birth_date
                    };
                    break;
                }
            }
            fs.writeFile('./students.json', JSON.stringify(parsedJson, null, 4), (err) => {
                if(err) {
                    res.send(err);
                } else {
                    res.redirect('/students');
                }
            });
        }
    });
});

studentsRouter.get('/:id/delete', (req, res) => {
    fs.readFile('./students.json', 'utf-8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            let result = null;
            let parsedJson = JSON.parse(data);
            let newData = [];
            for(let i = 0; i < parsedJson.length; i++) {
                let student = parsedJson[i];
                if(student.id === Number(req.params.id)) {
                    result = student;
                } else {
                    newData.push(student);
                }
            }
            if(result) {
                fs.writeFile('./students.json', JSON.stringify(newData), (err) => {
                    if(err) {
                        res.send(err);
                    } else {
                        res.redirect('/students');
                    }
                })
            } else {
                res.send('Student not found');
            }
        }
    });
});

module.exports = studentsRouter;