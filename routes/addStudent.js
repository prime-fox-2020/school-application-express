const express = require('express');
const router = express.Router();
const fs = require('fs');

router.use(express.urlencoded());

let err_msg;
router.get('/', (req, res) => {
  res.render('students_add.ejs', {err_msg});
})

router.post('/', (req, res) => {
  if (req.body.firstName && req.body.lastName && req.body.email && req.body.birthDate) {
    fs.readFile('./students.json', 'utf8', (err, data) => {
      if (err) {
        res.send(err);
      } else {
        let dataParse = JSON.parse(data);
        const newData = {
          id: dataParse[dataParse.length-1].id ? dataParse[dataParse.length-1].id+1 : 1,
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          birth_date: req.body.birthDate
        }

        dataParse.push(newData);

        fs.writeFile('./students.json', JSON.stringify(dataParse), ()=>{res.render('students_status.ejs', {newData})})
      }
    })
  } else {
    err_msg = 'Please fill all sections'
    res.render('students_add.ejs', {err_msg});
  }
})

module.exports = router;