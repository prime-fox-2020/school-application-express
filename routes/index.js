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

route.get('/student/:id/edit',studentcontroller.edit)
route.post('/student/:id/edit',studentcontroller.change)
route.get('/student/:id/delete',studentcontroller.delete)
route.get('/student/addstudent',studentcontroller.addForm)
route.post('/student/addstudent',studentcontroller.add)

route.get('/teacher/:id/edit',teachercontroller.edit)
route.post('/teacher/:id/edit',teachercontroller.change)
route.get('/teacher/:id/delete',teachercontroller.delete)
route.get('/teacher/addteacher',teachercontroller.addForm)
route.post('/teacher/addteacher',teachercontroller.add)

route.get('/subject/:id/edit',subjectcontroller.editSubject)






module.exports = route