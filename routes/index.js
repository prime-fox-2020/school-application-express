const routes = require('express').Router()
const routeStudents = require('./students')
const routeTeachers = require('./teachers')
const routeSubjects = require('./subjects')


routes.get('/', (req, res) => {
  res.send('Home Page')
})


routes.use('/students', routeStudents)
routes.use('/teachers', routeTeachers)
routes.use('/subjects', routeSubjects)

module.exports = routes