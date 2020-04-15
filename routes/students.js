const routes = require('express').Router()
const fs = require('fs')

routes.get('/', (req, res)=> {
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if (err) {throw err}
    else {
      const students = JSON.parse(data)
      res.render('viewstudents', { students })
    }
  })
})

routes.get('/add', (req, res) => {
  res.render('addstudents')
})

routes.post('/add', (req, res) => {
  // res.send(req.body)
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email
  const gender = req.body.gender
  if (first_name && last_name && email && gender){
    fs.readFile('./db/students.json', 'utf8', (err, data) => {
      if (err) {throw err}
      else {
        const students = JSON.parse(data)
        const id = students[students.length-1].id + 1
        students.push({id, first_name, last_name, email, gender})

        fs.writeFile('./db/students.json', JSON.stringify(students, null, 2), err => {
          if (err) {throw err}
          else {res.redirect('/students')}
        })
      }
    })
  } else {throw err}
})

routes.get('/edit/:id', (req, res) => {
  const ids = Number(req.params.id)
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if (err) {throw err}
    else {
      const student = JSON.parse(data)
      for (let i = 0; i < student.length; i++){
        if (student[i].id == ids){
          const studentData = student[i]
          res.render('editstudents', {studentData})
        }
      }
    }
  })
})

routes.post('/edit/:id', (req, res) => {
  const ids = Number(req.params.id)
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email
  const gender = req.body.gender
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if (err) {throw err}
    else {
      const students = JSON.parse(data)
      for (let i = 0; i < students.length; i++){
        if (students[i].id == ids){
          students[i].first_name = first_name
          students[i].last_name = last_name
          students[i].email = email
          students[i].gender = gender

          fs.writeFile('./db/students.json', JSON.stringify(students, null, 2), err => {
            if (err) {throw err}
            else {res.redirect('/students')}
          })
        }
      }
    }
  })
})

routes.get('/delete/:id', (req, res) => {
  const ids = Number(req.params.id)
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if (err) {throw err}
    else {
      const students = JSON.parse(data)
      const newStudents = []
      for (let i = 0; i < students.length; i++){
        if (students[i].id != ids){
          newStudents.push(students[i])
        }
      }

      fs.writeFile('./db/students.json', JSON.stringify(newStudents, null, 2), err => {
        if (err) {throw err}
        else {res.redirect('/students')}
      })
    }
  })
})

routes.get('/:email', (req, res)=> {
    let email = req.params.email
    let temp = {}
    for (let i = 0; i < students.length; i++){
      if (students[i].email == email){
        temp = students[i]
      }
    }
    res.send(`
      <h1> Data on Student with Email: ${email}</h1>
      <p>Name: ${temp.first_name} ${temp.last_name}</p>
      <p>Email: ${temp.email}</p>
      <p>Gender: ${temp.gender}</p>
    `)
})

module.exports = routes