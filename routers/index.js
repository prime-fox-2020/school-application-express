const routes = require('express').Router();
const {Home, Teachers, Students, Subjects} = require('../controllers')

routes.get('/', Home.render)
routes.get('/teachers/:id', Teachers.render)
routes.get('/teachers/:id/:action', Teachers.render)
routes.get('/teachers', Teachers.render)
routes.get('/students/:email', Students.render)
routes.get('/students/:email/:action', Students.render)
routes.get('/students', Students.render)
routes.get('/subjects/:id', Subjects.render)
routes.get('/subjects', Subjects.render)

/* 
* ADD NEW POST ROUTING
*/
routes.post('/teachers/add', Teachers.post)
routes.post('/students/add', Students.post)
routes.post('/subjects/add', Subjects.post)
/* 
* EDIT POST ROUTING
*/
routes.post('/students/:id/edit', Students.post)
routes.post('/teachers/:id/edit', Teachers.post)

routes.get('*', (request, response) => {
    response.status(404).render('404')
})

module.exports = routes;