const routes = require('express').Router();
const {Home, Teachers, Students, Subjects} = require('../controllers')

routes.get('/', Home.render)
routes.get('/teachers/:id', Teachers.render)
routes.get('/teachers', Teachers.render)
routes.get('/students/:email', Students.render)
routes.get('/students', Students.render)
routes.get('/subjects/:id', Subjects.render)
routes.get('/subjects', Subjects.render)

routes.get('*', (request, response) => {
    response.status(404).render('404')
})

module.exports = routes;