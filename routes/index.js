const express = require('express')
const model = require('../model.js')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('./home.ejs')
})

router.get('/teachers', (req, res)=>{
    res.render('./teachers.ejs', {data: model.readTeacher(), id: undefined})
})

router.get('/teachers/:id', (req, res)=>{
    res.render('./teachers.ejs', {data: model.readTeacher(), id: req.params.id})
})

router.get('/students', (req, res)=>{
    res.render('./students.ejs', {data: model.readStudent(), email: undefined})
})

router.get('/students/add', (req, res)=>{
    res.render('./addStudent.ejs')
})

router.get('/students/:email', (req, res)=>{
    res.render('./students.ejs', {data: model.readStudent(), email: req.params.email})
})

router.get('/students/:id/edit', (req, res)=>{
    res.render('./editStudent.ejs', {data: model.readStudent(), id: req.params.id})
})

router.get('/students/:id/delete', (req, res)=>{
    res.render('./deleteStudent.ejs', {data: model.readStudent(), id: req.params.id})
})

router.get('/subjects', (req, res)=>{
    res.render('./subjects.ejs', {data: model.readSubject(), id: undefined})
})

router.get('/subjects/:id', (req, res)=>{
    res.render('./subjects.ejs', {data: model.readSubject(), id: req.params.id})
})

router.post('/students/add', (req, res)=>{
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email
    let gender = req.body.gender
    let birthDate = req.body.birthdate
    model.addStudent(fname, lname, email, gender, birthDate)
    res.redirect('/students')
})

router.post('/students/delete', (req, res)=>{
    let id = req.body.id
    model.deleteStudent(id)
    res.redirect('/students')
})

router.post('/students/edit', (req, res)=>{
    let id = req.body.id
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email
    let gender = req.body.gender
    let birthDate = req.body.birthdate
    model.editStudent(id, fname, lname, email, gender, birthDate)
    res.redirect('/students')
})

module.exports = router