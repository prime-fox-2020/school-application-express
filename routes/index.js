const express = require('express')
const routes = express.Router()

const teachersData = require('../routes/teachers')
const studentsData = require('../routes/students')
const subjectsData = require('../routes/subjects')

routes.get('/', (req, res) => {
    res.send('<h1>School Application<h1>')
})
routes.use('/teachers', teachersData)
routes.use('/students', studentsData)
routes.use('/subjects', subjectsData)

module.exports = routes