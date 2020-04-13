const router = require('express').Router();
const fs = require('fs');

let subjects = fs.readFileSync('./data/subjects.json', 'utf-8')

router.get('/', (req, res) => {
    res.render('./subjects', {subjects: JSON.parse(subjects)})
})

router.get('/:id', (req, res) => {
    data = JSON.parse(subjects)
    res.send(data[req.params.id])
})
module.exports = router