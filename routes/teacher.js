const router = require('express').Router();
const fs = require('fs');

let teachers = fs.readFileSync('./data/teachers.json', 'utf-8')

router.get('/', (req, res) => {
    res.render('./teachers', {teachers: JSON.parse(teachers)})
})

router.get('/:id', (req, res) => {
    data = JSON.parse(teachers)
    res.send(data[req.params.id])
})

module.exports = router;
