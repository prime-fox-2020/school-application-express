const router = require('express').Router();
const fs = require('fs');

const teachers = require('./teachers');
const students = require('./students');
const subjects = require('./subjects');

router.get('/', (req, res) => {
  res.render('home.ejs');
})

router.use('/teachers', teachers);
router.use('/students', students);
router.use('/subjects', subjects);

module.exports = router;