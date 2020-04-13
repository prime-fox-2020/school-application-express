const fs      = require('fs');
const express = require('express');
const app     = express();
const port    = 3000 || process.env.PORT;

//json file
const teachers = fs.readFileSync('./db/teachers.json', 'utf8');
const students = fs.readFileSync('./db/students.json', 'utf8');
const subjects = fs.readFileSync('./db/subjects.json', 'utf8');

//SetUp 
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/teachers', (req,res) => {
  const teacher = JSON.parse(teachers);
  res.render('teachers', {teacher : teacher});
});

app.get('/teachers/:id', (req,res) => {
  const teacher = JSON.parse(teachers);
  res.render('teachers', {teacher : [teacher[req.params.id-1]]});
});

app.get('/students', (req,res) => {
  const student = JSON.parse(students);
  res.render('students', {student : student});
});

app.get('/students/:email', (req,res) => {
  const student = JSON.parse(students);
  res.render('students', {student : [student[req.params.email-1]]});
});

app.get('/subjects', (req,res) => {
  const subject = JSON.parse(subjects);
  res.render('subjects', {subject : subject});
});

app.get('/subjects/:id', (req,res) => {
  const subject = JSON.parse(subjects);
  res.render('subjects', {subject : [subject[req.params.id-1]]});
});

app.listen(port, () => console.log('School app is started'));