const express = require('express');
const fs = require('fs');
const routes = express.Router();

routes.get('/',(req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
    if (err) res.render(err);
    else res.render('students', {result: JSON.parse(data)});
  })
})

routes.get('/:email',(req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
    if (err) res.send(err);
    else  {
      const dataParse = JSON.parse(data);
      let result = undefined;

      for (let i = 0; i < dataParse.length; i++) {
        if(dataParse[i].email == req.params.email) {
          res.render('students', {result:[dataParse[i]]});
        }
      }
    }
  })
})

routes.get('/:id/add',(req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
    if (err) res.render(err);
    else res.render('./add', {result: JSON.parse(data)});
  })
})

routes.post('/:id/add',(req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
    if (err) res.render(err);
    else {
      const dataParse = JSON.parse(data);
      const listStudents = {
        id: dataParse[dataParse.length-1].id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender:  req.body.gender,
        birthdate: req.body.birthdate
      }
      dataParse.push(listStudents);
      fs.writeFile('./data/students.json', JSON.stringify(listStudents), (err, data) => {})
      res.redirect('/students')
    }
  })
})

routes.get('/:id/edit',(req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
    if (err) res.render(err);
    else res.render('./edit', {result: JSON.parse(data)});
  })
})

routes.post('/:id/edit',(req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
    if (err) res.render(err);
    else {
      const dataParse = JSON.parse(data);
        if(dataParse[i].id == req.params.id) {
            dataParse[req.params.id-1].first_name = req.body.first_name;
            dataParse[req.params.id-1].last_name = req.body.first_name;
            dataParse[req.params.id-1].email = req.body.email;
            dataParse[req.params.id-1].gender = req.body.gender;
            dataParse[req.params.id-1].birthdate = req.body.birthdate;
            fs.writeFile('./data/students.json', JSON.stringify(dataParse), (err, data) => {});
            res.redirect('/students');
        }
      }
  })
})

routes.get('/:id/delete',(req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
    if (err) res.render(err);
    else {
      const dataParse = JSON.parse(data);
      let result = [];
      for (let i = 0; i < dataParse.length; i++) {
        if (dataParse[i].id=== req.params.id) {
          continue;
        }
        else {
          result.push(dataParse[i]);
        }
        fs.writeFile('./data/students.json', JSON.stringify(result),(err,data)=>{});
        res.redirect('/students');
      }
    }
  })
})

module.exports = routes;
