const express = require('express');
const routes = express.Router();

const teachers = require('../routes/teachers');
const students = require('../routes/students');
const subjects = require('../routes/subjects');

routes.get('/',(req, res) => {
  res.render('index');
})

routes.use('/teachers', teachers); //use localhost:3000/teachers
routes.use('/students', students); // "" /students
routes.use('/subjects', subjects);// "" /subjects

module.exports = routes;
