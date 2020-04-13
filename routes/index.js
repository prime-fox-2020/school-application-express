const express = require('express')
const router = express()

router.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to our page!</h1>
            <p> try adding some routes of students/teachers/subjects on the url.</p>
    `)
})

const students = require('./student.js') // from routes
const subjects = require('./subject.js') // from routes
const teachers = require('./teacher.js') // from routes

router.use(students) // use the routes
router.use(subjects) // use the routes
router.use(teachers) // use the routes

module.exports = router;