'use strict';
const routes = require('express').Router();
const db = require('../db/config');

db.connect();
routes.get('/', (req, res) => {
    const success_msg = req.query.success_msg;
    db.query(`SELECT * FROM teachers`, (err, result) => {
        if (err) res.send(err);
        else {
            const teacherList = result.rows;
            res.render('teachers', {teacherList, success_msg});
            // db.end();
        }
    });
});
routes 

routes.get('/add', (req, res) => {
    const err_msg = req.query.err_msg;
    res.render('add_teacher', {err_msg});
});

routes.post('/add', (req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.email && req.body.gender) {
        db.query(`INSERT INTO teachers (first_name, last_name, email, gender) VALUES('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.gender}')`, (err, result) => {
            if (err) res.send(err);
            else res.redirect('/teachers?success_msg=Data successfully added to the list');
        });
    } else {
        res.redirect('/teachers/add?err_msg=All information must be filled');
    }
})

routes.get('/:id?', (req, res) => {
    // db.connect();
    db.query(`SELECT * FROM teachers WHERE id = ${req.params.id}`, (err, result) => {
        if (err) res.send(err);
        else {
            const teacherList = result.rows;
            res.render('teachers', {teacherList});
            // db.end();
        }
    });
});

module.exports = routes;