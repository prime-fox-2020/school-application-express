const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

const router = require('./routes/router')
app.use(router)

const students = require('./routes/students')
app.use(students)

const subjects = require('./routes/subjects')
app.use(subjects)

const teachers = require('./routes/teachers')
app.use(teachers)

app.listen(port, (req, res) => {
    console.log('============== START ==============')
    console.log('Port active in : ', port)
    console.log('===================================')
})