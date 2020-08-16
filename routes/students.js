'use strict';
const routes = require('express').Router();
const db = require('../db/config');

routes.get('/', (req, res) => {
    const msg = req.query.msg;
    db.query(`SELECT * FROM students`, (err, result) => {
        if (err) res.send(err);
        else {
            const studentList = result.rows;
            res.render('students', {studentList, msg});
        }
    });
});

routes.get('/edit/:id', (req, res) => {
    const err_msg = req.query.err_msg;
    db.query(`SELECT * FROM students WHERE id = '${req.params.id}'`, (err, result) => {
        if (err) res.send(err);
        else {
            const student = result.rows[0];
            res.render('edit_student', {student, err_msg});
        }
    });
});

routes.post('/edit/:id', (req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.email && req.body.gender && req.body.birth_date) {
        db.query(`
            UPDATE students SET first_name = '${req.body.first_name}', 
            last_name = '${req.body.last_name}', 
            email = '${req.body.email}', 
            gender = '${req.body.gender}', 
            birth_date = '${req.body.birth_date}'
            WHERE id = ${req.params.id}
        `, (err, result) => {
            if (err) {res.send(err); console.log(req.body);}
                else res.redirect(`/students?msg=Successfully update student data with id ${req.params.id}`);
            });
    } else {
        res.redirect('/students/add?err_msg=All information must be filled');
    }
});

routes.get('/delete/:id', (req, res) => {
    db.query(`DELETE FROM students WHERE id = ${req.params.id}`, (err, result) => {
        if (err) {
            res.redirect(`/students?msg=Delete student with id ${req.params.id} failed`);
        }
        else {
            res.redirect(`/students?msg=Delete student with id ${req.params.id} successful`);
        }
    });
});

routes.get('/add', (req, res) => {
    const err_msg = req.query.err_msg;
    res.render('add_student', {err_msg});
});

routes.post('/add', (req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.email && req.body.gender && req.body.birth_date) {
        db.query(`INSERT INTO students (first_name, last_name, email, gender, birth_date) VALUES('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.gender}', '${req.body.birth_date}')`, (err, result) => {
        
        if (err) {res.send(err); console.log(req.body);}
            else res.redirect('/students?msg=Student data successfully added to the list');
        });
    } else {
        res.redirect('/students/add?err_msg=All information must be filled');
    }
})

routes.get('/:email', (req, res) => {
    db.query(`SELECT * FROM students WHERE email = '${req.params.email}'`, (err, result) => {
        if (err) res.send(err);
        else {
            const studentList = result.rows;
            res.render('students', {studentList});
        }
    });
});

module.exports = routes;