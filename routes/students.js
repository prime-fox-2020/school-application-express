const router = require('express').Router();
const fs = require('fs');

const addStudent = require('./addStudent');
const editStudent = require('./editStudent');
const deleteStudent = require('./deleteStudent');

router.use('/add', addStudent);
router.use('/', editStudent);
router.use('/', deleteStudent);

router.get('/', (req, res) => {
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

router.get('/:email', (req, res) => {
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

module.exports = router;