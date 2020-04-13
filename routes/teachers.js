const fs = require('fs')

const express = require('express')
const routes = express.Router()


routes.get('/:id?', (req, res)=>{
  fs.readFile('./data/teachers.json', 'utf8', (err, data)=>{
    if(err) {
      res.send(err)
    } else {
      if(req.params.id){
        let listData = JSON.parse(data)
        const teachersData = listData.filter( (list) => list.id == req.params.id)
        res.render('teachers', {teachersData})
      } else {
        let teachersData = JSON.parse(data)
        res.render('teachers', {teachersData})
      }
    }
  })
})

module.exports = routes