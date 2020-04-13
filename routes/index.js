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

route.get('/student/:id/edit',studentcontroller.editStudent)
route.post('/student/:id/edit',studentcontroller.changeStudent)
route.get('/student/:id/delete',studentcontroller.deleteStudent)

route.get('/teacher/:id/edit',teachercontroller.editTeacher)
route.post('/teacher/:id/edit',teachercontroller.changeTeacher)

route.get('/subject/:id/edit',subjectcontroller.editSubject)






module.exports = route