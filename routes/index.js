//route directory

const route = require ('express').Router()
const studentcontroller = require('../controller/studentcontroller')
const subjectcontroller = require('../controller/subjectcontroller')
const teachercontroller = require('../controller/teachercontroller')

route.get('/', (req,res)=>{
    res.send('ini home lainnya di /students, /subjects, /teachers')
})


route.get('/students',studentcontroller.viewStudents)
route.get('/subjects',subjectcontroller.viewSubjects)
route.get('/teachers',teachercontroller.viewTeachers)






module.exports = route