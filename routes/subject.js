const fs = require('fs')
const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  fs.readFile('./data/subjects.json', 'utf8', (err, datas) => {
    let errorMsg
    if (err) {
      errorMsg = 'File not found!'
      res.render('404', errorMsg)
    } else {
      const subjects = JSON.parse(datas)
      res.render('subjectShowAll', { subjects })
    }
  })
})

routes.get('/:id', (req, res) => {
  fs.readFile('./data/subjects.json', 'utf8', (err, datas) => {
    if (err) {
      res.send('File not found!')
    } else {
      const subjects = JSON.parse(datas)
      const subject = subjects.find(t => t.id === Number(req.params.id))
      if (subject) {
        res.send(subject)
      } else {
        res.send(`Subject with id ${req.params.id} is not found!`)
      }
    }
  })
})

module.exports = routes