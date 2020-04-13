const fs = require('fs')
const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, datas) => {
    if (err) {
      res.send('File not found!')
    } else {
      const students = JSON.parse(datas)
      res.send(students)
    }
  })
})

routes.get('/:email', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, datas) => {
    if (err) {
      res.send('File not found!')
    } else {
      const students = JSON.parse(datas)
      const student = students.find(s => s.email === req.params.email)
      if (student) {
        res.send(student)
      } else {
        res.send(`Student with email ${req.params.email} is not found!`)
      }
    }
  })
})

module.exports = routes