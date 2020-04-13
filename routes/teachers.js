const fs = require('fs')
const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  fs.readFile('./data/teachers.json', 'utf8', (err, datas) => {
    if (err) {
      res.send('File not found!')
    } else {
      const teachers = JSON.parse(datas)
      res.send(teachers)
    }
  })
})

routes.get('/:id', (req, res) => {
  fs.readFile('./data/teachers.json', 'utf8', (err, datas) => {
    if (err) {
      res.send('File not found!')
    } else {
      const teachers = JSON.parse(datas)
      const teacher = teachers.find(t => t.id === Number(req.params.id))
      if (teacher) {
        res.send(teacher)
      } else {
        res.send(`Teacher with id ${req.params.id} is not found!`)
      }
    }
  })
})

module.exports = routes