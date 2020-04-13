const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index')
})

const students = require('./students')
router.use('/students', students)

const subjects = require('./subjects')
router.use('/subjects', subjects)

const teachers = require('./teachers')
router.use('/teachers', teachers)

module.exports = router