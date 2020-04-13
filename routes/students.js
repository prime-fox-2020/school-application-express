const { Router } = require('express')
const router = Router()

const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            res.render('./students.ejs', { data })
        }
    })

})

router.get('/add', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)

            res.render('./add.ejs', { data })

        }
    })
})

router.post('/add', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)

            const addStudent = {
                id: data[data.length - 1].id + 1,
                first_name: req.body.fname,
                last_name: req.body.lname,
                email: req.body.email,
                gender: req.body.gender,
                birth_date: req.body.birthdate
            }
            data.push(addStudent)
            fs.writeFile('./students.json', JSON.stringify(data), (err, data) => { })
            res.redirect('/students')
        }
    })
})


router.get('/:id/edit', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            const idStud = req.params.id

            let result = null

            for (var i = 0; i < data.length; i++) {
                if (parseInt(idStud) === data[i].id) {
                    result = data[i]
                }
            }
            if (result) {
                // res.send(result)
                data = data.filter(data => data.id === parseInt(req.params.id))
                res.render('/edit.ejs', { data })
            }
            else {
                res.send('Tidak ada id tersebut')
            }
        }
    })
})

router.post('/:id/edit', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            const idStud = req.params.id

            let result = null

            for (var i = 0; i < data.length; i++) {
                if (parseInt(idStud) === data[i].id) {
                    result = data[i]
                }
            }
            if (result) {
                // res.send(result)
                data[req.params.id - 1].first_name = req.body.fname
                data[req.params.id - 1].last_name = req.body.lname
                data[req.params.id - 1].email = req.body.email
                data[req.params.id - 1].gender = req.body.gender
                data[req.params.id - 1].birth_date = req.body.birthdate
                fs.writeFile('./students.json', JSON.stringify(data), (err, data) => { })

                res.render('/students')
            }

        }
    })
})


router.get('/:email', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            // console.log(data);
            const emailSt = req.params.email

            let result = null;

            for (let i = 0; i < data.length; i++) {
                if (emailSt === data[i].email) {
                    result = data[i]
                }
            }
            if (result) {
                // result = data;
                data = data.filter(data => data.email === req.params.email)
                res.render('./students.ejs', { data })
            } else {
                res.send('Tidak ada email seperti itu...')
            }
        }
    })
})

module.exports = router