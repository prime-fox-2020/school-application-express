const { Router } = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.render('index')
})
const students = require('./students')
router.use('/students', students)


const teachers = require('./teachers')
router.use('/teachers', teachers)

const subjects = require('./subjects')
router.use('/subjects', subjects)


module.exports = router