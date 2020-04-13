const fs = require('fs')

const express = require('express')
const routes = express.Router()


routes.get('/:id?', (req, res)=>{
  fs.readFile('./data/subjects.json', 'utf8', (err, data)=>{
    if(err) {
      res.send(err)
    } else {
      if(req.params.id){
        let listData = JSON.parse(data)
        const subjectsData = listData.filter( (list) => list.id == req.params.id)
        res.render('subjects', {subjectsData})
      } else {
        let subjectsData = JSON.parse(data)
        res.render('subjects', {subjectsData})
      }
    }
  })
})

module.exports = routes