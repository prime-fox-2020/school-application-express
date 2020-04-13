'use strict';
const routes = require('express').Router();
const teacherRoutes = require('./teachers');
const studentRoutes = require('./students');
const subjectRoutes = require('./subjects');

routes.get('/', (req, res) => {
    res.send("<h1>School Home Page</h1>");
})
routes.use('/teachers', teacherRoutes);
routes.use('/students', studentRoutes);
routes.use('/subjects', subjectRoutes);

module.exports = routes;