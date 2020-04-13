const fs = require('fs')
const teachers = JSON.parse(fs.readFileSync('./teachers.json', 'utf8'))
const students = JSON.parse(fs.readFileSync('./students.json', 'utf8'))
const subject = JSON.parse(fs.readFileSync('./subject.json', 'utf8'))

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

// console.table(teachers)

app.get('/', (req, res) => {
    const message = 'Sekolah Muara Ilmu merupakan institusi pendidikan formal yang memiliki akreditasi A.\nSekolah Muara Ilmu menggunakan kurikulum berbasis internasional yang diterapkan di Jepang.\nDengan tim pengajar yang memiliki spesialisasi pada bidang pengajaran, kami dapat mencetak generasi-generasi cemerlang.'
    res.render('home.ejs', {
        message : message
    })
})

app.get ('/teachers', (req, res) => {
    res.render('teachers.ejs', {
        teachers : teachers
    })
})

app.get ('/teachers/:id', (req, res) => {
    for (let i = 0; i < teachers.length; i++) {
        if (teachers[i].id == req.params.id) {
            res.send(teachers[i])
        }
    }
})

app.get ('/students', (req, res) => {
    res.render('students.ejs', {
        students : students
})})

app.get ('/students/add_student', (req, res) => {
    res.render('add_student.ejs');
})

app.post('/students/add_student', (req, res) => {
    res.send(req.body)
    const idStudent = students[students.length-1].id + 1;
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const emailStudent = req.body.email
    let genderStudent = req.body.gender
    if (genderStudent == 1) {
        genderStudent = 'male';
    }
    else {
        genderStudent = 'female';
    }
    const dob = req.body.birth_date
    
    students.push({id : idStudent, first_name : firstname, last_name : lastname, email : emailStudent, gender : genderStudent, birth_date : dob})
    fs.writeFileSync('./students.json', JSON.stringify(students, null, 2))
    res.redirect('/students')

})

app.get('/students/:id/delete', (req, res) => {
    let paramId = req.params.id;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == paramId) {
            students.splice(i, 1)
        }
    }
    fs.writeFileSync('./students.json', JSON.stringify(students, null, 2))
    res.redirect('/students')
    // res.send('Data deleted')
})

app.get('/students/:id/edit', (req, res) => {
    let paramId = req.params.id
    let populatedStudent = [];
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == req.params.id) {
            populatedStudent.push(students[i].first_name, students[i].last_name, students[i].email)
        }
    }
    console.log(populatedStudent)
    res.render('edit_student.ejs', {
        paramId : paramId,
        populatedStudent : populatedStudent
    })
})

app.post('/students/:id/edit', (req, res) => {
    // res.send(req.params.id)
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == req.params.id) {
            // res.send('masuk if')
            students[i].first_name = req.body.firstname;
            students[i].last_name = req.body.lastname;
            students[i].email = req.body.email;
        }
    }
    fs.writeFileSync('./students.json', JSON.stringify(students, null, 2))
    res.redirect('/students')
})

app.get ('/students/:email', (req, res) => {
    for (let i = 0; i < students.length; i++) {
        if (students[i].email == req.params.email) {
            res.send(students[i])
        }
    }
})

app.get ('/subject', (req, res) => {
    res.render('subject.ejs', {
        subject : subject
    })})

app.get ('/subject/:id', (req, res) => {
    for (let i = 0; i < subject.length; i++) {
        if (subject[i].id == req.params.id) {
            res.send(subject[i])
        }
    }
})

app.listen (port, () => {
    console.log('This app is running on port: ', port)
})