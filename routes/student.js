const router = require('express').Router();
const fs = require('fs');


router.get('/', (req, res) => {
    let students = fs.readFileSync('./data/students.json', 'utf-8')
    res.render('./students', { students: JSON.parse(students) })
})

router.get('/add', (req, res) => {
    res.render('./addStudent')
})

router.post('/add', (req, res) => {
    let students = fs.readFileSync('./data/students.json', 'utf-8')
    data = JSON.parse(students)
    let newData = {
        id: data[data.length - 1].id + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        birth_date: req.body.birth_date
    }
    data.push(newData)
    fs.writeFileSync('./data/students.json', JSON.stringify(data, null, 4))
    res.redirect('/students')
})

router.get('/:email', (req, res) => {
    data = JSON.parse(students)
    data.forEach(el => { el.email == req.params.email ? res.render('./students', { students: [el] }) : null });
})

router.get('/:id/edit', (req, res) => {
    let students = fs.readFileSync('./data/students.json', 'utf-8')
    data = JSON.parse(students)
    data.forEach(el => { el.id == req.params.id ? res.render('./editStudent', { student: el }) : null });
})

router.post('/:id/edit', (req, res) => {
    let students = fs.readFileSync('./data/students.json', 'utf-8')
    data = JSON.parse(students)
    data.forEach(el => {
        if (req.params.id == el.id) {
            el.first_name = req.body.first_name,
                el.last_name = req.body.last_name,
                el.email = req.body.email,
                el.gender = req.body.gender,
                el.birth_date = (req.body.birth_date)
        }
    });
    fs.writeFileSync('./data/students.json', JSON.stringify(data, null, 4))
    res.redirect('/students')
})

router.get('/:id/delete', (req, res) => {
    let students = fs.readFileSync('./data/students.json', 'utf-8')
    data = JSON.parse(students)
    console.log(req.params.id);
    let newData = []
    data.forEach(el => { req.params.id != el.id ? newData.push(el) : null });
    console.log('data: ', newData);
    fs.writeFileSync('./data/students.json', JSON.stringify(newData, null, 4))
    res.redirect('/students')
})
module.exports = router