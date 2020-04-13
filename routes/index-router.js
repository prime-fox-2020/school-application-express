const router = require('express').Router()
const teachersRoutes = require('./teachers-router')
const studentsRoutes = require('./students-router')
const subjectsRoutes = require('./subjects-router')


router.get('/', (req, res) => {
    res.send("<h1>School App Home</h1>")
})

router.use('/teachers', teachersRoutes)
router.use('/students', studentsRoutes)
router.use('/subjects', subjectsRoutes)


module.exports = router
