const {Router} = require('express')
const router = Router()

const fs = require ('fs')

router.get('/', (req, res) => {
    fs.readFile('./data/students.json', "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.render('students', { students: JSON.parse(data) })
        }
    })
})


router.get('/add', (req, res) => {
    res.render('add-student')
})

router.post('/add', (req, res) => {
    console.log('req: ', req.body);
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            let dataAdd = {
                'id': data[data.length - 1].id + 1,
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'email': req.body.email,
                'gender': req.body.gender,
                'birth_date': req.body.birth_date
            }
            data.push(dataAdd)
            fs.writeFile('./data/students.json', JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect('/students')
                }
            })
        }
    })
})

router.get('/:id/delete', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            let newData = []
            let id = req.params.id
            for (let i = 0; i < data.length; i++) {
                if (data[i].id !== Number(id)) {
                    newData.push(data[i])
                    console.log('data deleted');
                }
            }
            fs.writeFile('./data/students.json', JSON.stringify(newData, null, 2), (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect('/students')
                }
            })
        }
    })
})

router.get('/:id/edit', (req, res) => {
    fs.readFile('./data/students.json', "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            let id = req.params.id
            let result = []
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === Number(id)) {
                    result.push(data[i])
                    res.render('edit-student', {students: result})
                }
            }
        }
    })
})

router.post('/:id/edit', function (req, res){
    fs.readFile("./data/students.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === Number(req.body.studentId)) {
                    console.log('data updated');
                    if(req.body.firstName){
                        data[i].first_name = req.body.firstName
                    }
                    if(req.body.lastName){
                        data[i].last_name = req.body.lastName
                    }
                    if(req.body.email){
                        data[i].email = req.body.email
                    }
                    if(req.body.gender){
                        data[i].gender = req.body.gender
                    }
                    if(req.body.birthDate){
                        data[i].birth_date = req.body.birthDate
                    }
                }
            }
            fs.writeFile('./data/students.json', JSON.stringify(data, null, 4), (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect("/students")
                }
            })
        }
    })
})

router.get('/:email', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err){
            res.send(err)
        } else {

            data = JSON.parse(data)
            const emailStudents = req.params.email
            let result = []

            for(let i = 0; i < data.length; i++){
                if(emailStudents === data[i].email){
                    result.push(data[i])
                }
            }
            if (result) {
                res.render('students', { students: result })
            } else {
                res.send('student not found')
            }
        }
    })
})

module.exports = router