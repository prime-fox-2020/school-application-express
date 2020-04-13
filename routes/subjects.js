const express = require('express');
const fs = require('fs');
const routes = express.Router();

routes.get('/',(req, res) => {
  fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
    if (err) res.render(err);
    else res.render('subjects', {result: JSON.parse(data)});
  })
})

routes.get('/:id',(req, res) => {
  fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
    if (err) res.send(err);
    else  {
      const dataParse = JSON.parse(data);
      let result = undefined;

      for (let i = 0; i < dataParse.length; i++) {
        if(dataParse[i].id == req.params.id) {
          res.render('subjects', {result:[dataParse[i]]});
        }
      }
    }
  })
})

module.exports = routes;
