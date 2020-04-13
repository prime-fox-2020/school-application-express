const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

module.exports = router;