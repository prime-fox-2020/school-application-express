const express = require('express')
const routes = express.Router()
const teacherRoute = require('./teacher')
const studentRoute = require('./student')
const subjectRoute = require('./subject')

routes.get('/', (req, res) => {
  res.render('index')
})

routes.use('/teachers', teacherRoute)
routes.use('/students', studentRoute)
routes.use('/subjects', subjectRoute)

module.exports = routes