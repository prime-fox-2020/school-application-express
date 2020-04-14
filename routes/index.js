const express = require('express')
const routes = express.Router()

const home = require('../routes/home')
const teachersData = require('../routes/teachers')
const studentsData = require('../routes/students')
const subjectsData = require('../routes/subjects')


routes.use('/', home)
routes.use('/teachers', teachersData)
routes.use('/students', studentsData)
routes.use('/subjects', subjectsData)

module.exports = routes