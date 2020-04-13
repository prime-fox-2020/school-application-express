const express = require('express');
const router = express.Router();
const fs = require('fs');

router.use(express.urlencoded());

let err_msg;

router.get('/:id/edit', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    let dataParse = JSON.parse(data);
    if (err) {
      res.send(err);
    } else {
      const id = req.params.id;
      for (let i = 0; i < dataParse.length; i++) {
        if (dataParse[i].id == id) {
          const edit = dataParse[i];
          res.render('students_edit.ejs', {err_msg, edit});
        }
      }
    }
  })
})

router.post('/:id/edit', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    let dataParse = JSON.parse(data);
    if (err) {
      res.send(err);
    } else {
      const id = req.params.id;
      for (let i = 0; i < dataParse.length; i++) {
        if (dataParse[i].id == id) {
          dataParse[i].first_name = req.body.firstName;
          dataParse[i].last_name = req.body.lastName;
          dataParse[i].email = req.body.email;
          dataParse[i].birth_date = req.body.birthDate;
        }
      }

      fs.writeFile('./students.json', JSON.stringify(dataParse), () => res.send('edit berhasil, <a href="/students">Show all data</a>'));
    }
  })
})

module.exports = router;