const fs = require('fs')

const express = require('express')
const routes = express.Router()


routes.get('/:email?', (req, res)=>{
  fs.readFile('./data/students.json', 'utf8', (err, data)=>{
    if(err) {
      res.send(err)
    } else {
      if(req.params.email){
        let listData = JSON.parse(data)
        const studentsData = listData.filter( (list) => list.email == req.params.email)
        res.render('students', {studentsData})
      } else {
        let studentsData = JSON.parse(data)
        res.render('students', {studentsData})
      }
    }
  })
})

module.exports = routes