const express = require('express');
const fs = require('fs');

const app = express();

app.get('/teachers', (req, res) => {
  fs.readFile('./teachers.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data);
      res.render('teachers.ejs', {
        dataParse
      });
    }
  })
})

app.get('/teachers/:id', (req, res) => {
  fs.readFile('./teachers.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data).filter(dat => dat.id == req.params.id)
      res.render('teachers.ejs', {
        dataParse
      });
    }
  })
})

app.get('/students', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data);
      res.render('students.ejs', {
        dataParse
      });
    }
  })
})

app.get('/students/:email', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data).filter(dat => dat.id == req.params.id)
      res.render('students.ejs', {
        dataParse
      });
    }
  })
})

app.get('/subjects', (req, res) => {
  fs.readFile('./subjects.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data);
      res.render('subjects.ejs', {
        dataParse
      });
    }
  })
})

app.get('/subjects/:id', (req, res) => {
  fs.readFile('./subjects.json', 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const dataParse = JSON.parse(data).filter(dat => dat.id == req.params.id)
      res.render('students.ejs', {
        dataParse
      });
    }
  })
})

module.exports = app;