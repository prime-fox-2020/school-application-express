const routes = require('express').Router();
const {Home, Teachers, Students, Subjects} = require('../controllers')

routes.get('/', Home.send)
routes.get('/teachers', Teachers.send)
routes.get('/students', Students.send)
routes.get('/subjects', Subjects.send)

module.exports = routes;