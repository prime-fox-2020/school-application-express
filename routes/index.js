const router = require('express').Router()

const studentRouter = require('./student');
const teacherRouter = require('./teacher');
const subjectRouter = require('./subject');

router.get('/', (req, res) => {
    res.render('./home')
})

router.use('/students', studentRouter)
router.use('/teachers', teacherRouter)
router.use('/subjects', subjectRouter)

module.exports = router