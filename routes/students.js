'use strict';
const routes = require('express').Router();
const db = require('../db/config');

// db.connect();
routes.get('/', (req, res) => {
    db.query(`SELECT * FROM students`, (err, result) => {
        if (err) res.send(err);
        else {
            const studentList = result.rows;
            res.render('students', {studentList});
            // db.end();
        }
    });
});

routes.get('/:email', (req, res) => {
    db.query(`SELECT * FROM students WHERE email = '${req.params.email}'`, (err, result) => {
        if (err) res.send(err);
        else {
            const studentList = result.rows;
            res.render('students', {studentList});
            // db.end();
        }
    });
});
// db.end();

module.exports = routes;