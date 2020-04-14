const {Router} = require('express')
const router = Router()

const students = require('./student.js') // from routes
const subjects = require('./subject.js') // from routes
const teachers = require('./teacher.js') // from routes

router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.use('/students', students) // use the routes
router.use('/subjects', subjects) // use the routes
router.use('/teachers', teachers) // use the routes

module.exports = router;