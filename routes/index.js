const routes = require('express').Router();
const routeTeachers = require('./teachers');
const routeStudents = require('./students');
const routeSubjects = require('./subjects');

routes.get('/', (req, res) => {
    res.send('Home Page');
})

routes.use('/teachers', routeTeachers);
routes.use('/students', routeStudents);
routes.use('/subjects', routeSubjects);

module.exports = routes;