// const express = require('express')
const routes = require('express').Router()
const teacherRoutes = require('./teacher')
const studentRoutes = require('./students')
const subjectRoutes = require('./subjects')

// const app = express()

routes.get('/', (req,res) => {
    res.send('Welcome to SD Sumbangsih 18 Bogor')
})

routes.use('/teacher',teacherRoutes)
routes.use('/students',studentRoutes)
routes.use('/subjects',subjectRoutes)

module.exports = routes