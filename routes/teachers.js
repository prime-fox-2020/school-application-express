const fs = require('fs')
const routes = require('express').Router()

routes.get('/', (req, res) => {
  fs.readFile('./data/teachers.json','utf8', (err, data) => {
    data = JSON.parse(data)
    if(err) {
      res.send(err)
    } else {
      res.render('teachers', {teachers: data})
    }
  })
})

routes.get('/:id', (req, res) => {
  fs.readFile('./data/teachers.json','utf8',(err, data) => {
    if(err) {
      res.send(err)
    } else {
      data = JSON.parse(data)
      let teacher = []
      for(let i = 0; i < data.length; i++) {
        if(data[i].id == req.params.id) {
          teacher.push(data[i])
        }
      }
      if(teacher.length > 0) {
        res.render('teachers', {teachers:teacher})
      } else {
        res.send('Id not found')
      }
    }
  })
});

module.exports = routes