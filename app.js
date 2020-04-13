const fs          = require('fs');
const dateConvert = require('./class/dateConvert');
const bodyParser  = require('body-parser');
const express     = require('express');
const app         = express();
const port        = 3000 || process.env.PORT;


//SetUp 
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/teachers', (req,res) => {
  fs.readFile('./db/teachers.json', 'utf8', (err, data) => {
    if(err) throw err;
    const teacher = JSON.parse(data);
    res.render('teachers', {teacher : teacher});
  });
});

app.get('/teachers/:id', (req,res) => {
  fs.readFile('./db/teachers.json', 'utf8', (err, data) => {
    if(err) throw err;
    const teacher = JSON.parse(data);
    res.render('teachers', {teacher : [teacher[req.params.id-1]]});
  });
});

app.get('/students', (req,res) => {
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if(err) throw err;
    const student = JSON.parse(data);
    res.render('students', {student : student});
  });
});

app.post('/students', (req,res) => {
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if(err) console.log(err);
    const student     = JSON.parse(data);
    const first_name  = req.body.first_name;
    const last_name   = req.body.last_name;
    const email       = req.body.email;
    const gender      = req.body.gender;
    const birthday    = req.body.birthday;
    const dateBirth   = dateConvert.dateToString(birthday);
    
    student.push({
      id : student.length + 1,
      first_name : first_name,
      last_name : last_name,
      email : email,
      gender : gender,
      birth_date: dateBirth
    });
    const stud = JSON.stringify(student, null, 2);
    fs.writeFile('./db/students.json', stud, (err)=>{
      if(err) console.log(err);
      res.redirect('/students');
    });
  });
});

app.get('/students/add', (req,res) => {
  res.render('students/add');
});

app.get('/students/:id/edit', (req,res) => {
  fs.readFile('./db/students.json', 'utf8', (err,data) => {
    if(err) throw err;
    const student = JSON.parse(data);
    const convert = dateConvert.stringToDate(student[req.params.id-1].birth_date);
    student[req.params.id-1].birth_date = convert;
    res.render('students/edit', {student : student[req.params.id-1]});
  });
});

app.post('/students/:id', (req,res) => {
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if(err) console.log(err);
    const student     = JSON.parse(data);
    const first_name  = req.body.first_name;
    const last_name   = req.body.last_name;
    const email       = req.body.email;
    const gender      = req.body.gender;
    const dateBirth   = dateConvert.dateToString(birthday);
    const studen      = {
      id : Number(req.params.id),
      first_name : first_name,
      last_name : last_name,
      email : email,
      gender : gender,
      birth_date: dateBirth
    };
    student.splice(req.params.id-1, 1, studen);
    const stud = JSON.stringify(student, null, 2);
    fs.writeFile('./db/students.json', stud, (err)=>{
      if(err) console.log(err);
      res.redirect('/students');
    });
  });
});

app.get('/students/:id/delete', (req,res) => {
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if(err) console.log(err);
    const student     = JSON.parse(data);
    for(let i = 0; i < student.length; i++){
      if(Number(req.params.id) === student[i].id) student.splice(i, 1);
    }
    const stud = JSON.stringify(student, null, 2);
    fs.writeFile('./db/students.json', stud, (err)=>{
      if(err) console.log(err);
      res.redirect('/students');
    });
  });
});

app.get('/students/:email', (req,res) => {
  fs.readFile('./db/students.json', 'utf8', (err, data) => {
    if(err) throw err;
    const student = JSON.parse(data);
    let index;
    for(let i = 0; i < student.length; i++){
      if(req.params.email === student[i].email) index = i;
    }
    res.render('students', {student : [student[index]]});
  });
});

app.get('/subjects', (req,res) => {
  fs.readFile('./db/subjects.json', 'utf8', (err, data) => {
    if(err) throw err;
    const subject = JSON.parse(data);
    res.render('subjects', {subject : subject});
  });
});

app.get('/subjects/:id', (req,res) => {
  fs.readFile('./db/subjects.json', 'utf8', (err, data) => {
    if(err) throw err;
    const subject = JSON.parse(data);
    
    res.render('subjects', {subject : [subject[req.params.id-1]]});
  });
});

app.listen(port, () => console.log('School app is started'));