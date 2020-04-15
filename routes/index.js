const routes = require('express').Router()
const studentsRoute = require('./students')
const teachersRoute = require('./teachers')
const subjectsRoute = require('./subjects')

routes.get('/', (req, res)=> {
    res.send(`<h1>App is online!</h1>   `)
})

routes.use('/teachers', teachersRoute)
routes.use('/teachers/:id', teachersRoute)
routes.use('/students', studentsRoute)
routes.use('/students/:email', studentsRoute)
routes.use('/subjects', subjectsRoute)
routes.use('/subjects/:id', subjectsRoute)

module.exports = routes