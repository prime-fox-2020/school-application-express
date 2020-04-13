const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')
const students = require('./students')
const subjects = require('./subjects')

routes.get('/', (req, res) => {
  res.send('Welcome to School App!')
})

routes.use('/teachers', teachers)
routes.use('/students', students)
routes.use('/subjects', subjects)

module.exports = routes