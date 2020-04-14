const router = require('express').Router()


const studentsRouter = require('./students')
const teachersRouter = require('./teachers')
const subjectsRouter = require('./subjects')

router.use('/subjects', subjectsRouter)
router.use('/teachers', teachersRouter)
router.use('/students', studentsRouter)

router.get('/', (req, res) => {
    res.send('this is home page')
})

module.exports = router