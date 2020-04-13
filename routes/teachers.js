const express = require('express');
const fs = require('fs');
const routes = express.Router();

routes.get('/',(req, res) => {
  fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
    if (err) res.send(err);
    else res.render('teachers', {result:JSON.parse(data)});
  })
})

routes.get('/:id',(req, res) => {
  fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
    if (err) res.send(err);
    else  {
      const dataParse = JSON.parse(data);
      let result = undefined;

      for (let i = 0; i < dataParse.length; i++) {
        if(dataParse[i].id == req.params.id) {
          res.render('teachers', {result:[dataParse[i]]});
        }
      }
    }
  })
})


module.exports = routes;
