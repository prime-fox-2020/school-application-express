const express = require('express')
const fs = require('fs')
const students = JSON.parse(fs.readFileSync('./students.json', 'utf8'))
const teachers = JSON.parse(fs.readFileSync('./teachers.json', 'utf8'))
const subjects = JSON.parse(fs.readFileSync('./subjects.json', 'utf8'))

const app = express()

app.get('/', (req, res)=> {
    res.send(`<h1>App is online!</h1>   `)
})

app.get('/teachers', (req, res)=> {
    res.send(`
      <h1>Teachers Information</h1>
      ${teachers}
    `)
})

app.get('/teachers/:id', (req, res)=> {
    let id = req.params.id
    let temp = {}
    for (let i = 0; i < teachers.length; i++){
      if (teachers[i].id == id){
        temp = teachers[i]
      }
    }
    res.send(`
      <h1> Data on Teacher with ID: ${id}</h1>
      <p>Name: ${temp.first_name} ${temp.last_name}</p>
      <p>Email: ${temp.email}</p>
      <p>Gender: ${temp.gender}</p>
    `)
})

app.get('/students', (req, res)=> {
    res.send(`
      <h1>Students Information</h1>
      ${students}
    `)
})

app.get('/students/:email', (req, res)=> {
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

app.get('/subjects', (req, res)=> {
    res.send(`
      <h1>Subjects Information</h1>
      ${subjects}
    `)
})

app.get('/subjects/:id', (req, res)=> {
    let id = req.params.id
    let temp = {}
    for (let i = 0; i < subjects.length; i++){
      if (subjects[i].id == id){
        temp = subjects[i]
      }
    }
    res.send(`
      <h1> Data on Subject with ID: ${id}</h1>
      <p>Subject Name: ${temp.subject_name}</p>
    `)
})

app.listen(3000, ()=> {
    console.log(`App online!`)
})