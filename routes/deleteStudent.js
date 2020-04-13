const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/:id/delete', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    const id = req.params.id;
    if (err) {
      res.send(err);
    } else {
      let dataParse = JSON.parse(data);
      let dataNew = dataParse.filter(dat => dat.id != id);
      fs.writeFile('./students.json', JSON.stringify(dataNew), () => res.send('data deleted, <a href="/students">Show all data</a>'));
    }
  })
})

module.exports = router;