'use strict';
const routes = require('express').Router();
const db = require('../db/config');

routes.get('/', (req, res) => {
    db.query(`SELECT * FROM subjects`, (err, result) => {
        if (err) res.send(err);
        else {
            const subjectList = result.rows;
            res.render('subjects', {subjectList});
        }
    });
});

routes.get('/:id', (req, res) => {
    db.query(`SELECT * FROM subjects WHERE id = ${req.params.id}`, (err, result) => {
        if (err) res.send(err);
        else {
            const subjectList = result.rows;
            res.render('subjects', {subjectList});
        }
    });
});

module.exports = routes;