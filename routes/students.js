const fs = require('fs')

const express = require('express')
const routes = express.Router()


routes.get('/add', (req, res) =>{
  res.render('add')
})

routes.post('/add', (req,res) => {
  fs.readFile('./data/students.json', 'utf8', (err,data) => {
    if(err){
      res.send(err)
    } else {
      const list = JSON.parse(data)
      const newId = list[list.length-1].id + 1
      list.push({
        "id" : newId,
        "first_name" : req.body.first_name ,
        "last_name" : req.body.last_name ,
        "email" : req.body.email ,
        "gender" : req.body.gender ,
        "birth_date" : req.body.birth_date
      })
      fs.writeFile('./data/students.json', JSON.stringify(list, null, 2), (err) =>{
        if(err) {
          res.send(err)
        }
        let studentsData = list
        res.render('students', {studentsData})
      })
    } 
  })
})

routes.get('/:id/edit', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err,data) => {
    if(err) {
      res.send(err) 
    } else {
      const list = JSON.parse(data)
      const detail_student = list.filter((item) => item.id == req.params.id)
      res.render('edit', {detail_student})
    } 
  })
})

routes.post('/:id/edit', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err,data) => {
    if(err){
      res.send(err) 
    } else {
      let list = JSON.parse(data)
      list.forEach((item) => {
        if(item.id == req.body.id){
          item.first_name = req.body.first_name
          item.last_name = req.body.last_name
          item.email = req.body.email
          item.gender = req.body.gender
          item.birth_date = req.body.birth_date
        }
      })
      fs.writeFile('./data/students.json', JSON.stringify(list, null, 2), (err) =>{
        if(err) {
          res.send(err)
        } else {
          const studentsData = list
          res.render('students', {studentsData})
        }
      })
    } 
  })
})

routes.get('/:id/delete', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err,data) => {
    if(err) {
      res.send(err)
    } else {
      const list = JSON.parse(data)
      const temp = []
      list.forEach((item) => {
        if(item.id != req.params.id){
          temp.push(item)
        }
      })
      fs.writeFile('./data/students.json', JSON.stringify(temp, null, 2), (err) =>{
        if(err) {
          res.send(err)
        } else {
          const studentsData = temp
          res.render('students', {studentsData})
        }
      })
    } 
  })
})

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