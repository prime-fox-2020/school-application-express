const { Router } = require('express')
const router = Router()

const students = require('./students')
router.use('/students', students)

const subjects = require('./subjects')
router.use('/subjects', subjects)

const teachers = require('./teachers')
router.use('/teachers', teachers)

router.get('/', (req, res) => {
    res.send('School Application')
})

module.exports = router