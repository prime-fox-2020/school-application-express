const express = require('express');
const fs = require('fs');

const app = express();

app.get('/teachers', (req, res) => {
  res.render('teachers.ejs');
})

app.get('/teachers/:id', (req, res) => {
  fs.readFile('./teachers.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data)
      res.send(dataParse.filter(dat => dat.id == req.params.id));
    }
  })
})

app.get('/students', (req, res) => {
  res.render('students.ejs');
})

app.get('/students/:email', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data)
      res.send(dataParse.filter(dat => dat.email == req.params.email));
    }
  })
})

app.get('/subjects', (req, res) => {
  res.render('subjects.ejs');
})

app.get('/subjects/:id', (req, res) => {
  fs.readFile('./teachers.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data)
      res.send(dataParse.filter(dat => dat.id == req.params.id));
    }
  })
})

module.exports = app;