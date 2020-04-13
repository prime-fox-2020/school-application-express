const router = require('express').Router()
const fs = require ('fs')

router.get('/', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.render('students', { students: JSON.parse(data) })
        }
    })
})


router.get('/add', (req, res) => {
    res.render('addStudent')
})

router.post('/add', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            let newRow = {
                'id': data[data.length - 1].id + 1,
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'email': req.body.email
            }
            data.push(newRow)
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
            let id = req.params.id

            let newData = []
            let isFound = false
            for (let i = 0; i < data.length; i++) {
                if (data[i].id !== Number(id)) {
                    newData.push(data[i])
                } else {
                    isFound = true
                }
            }

            if(!isFound) {
                res.send(`No student with ID = ${id}`)
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
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            let id = req.params.id

            let result = []
            let isFound = false
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === Number(id)) {
                    isFound = true
                    result.push(data[i])
                    res.render('editStudent', {students: result})
                }
            }

            if(!isFound){
                res.send(`No student with ID = ${id}`)
            }
        }
    })
})

router.post('/:id/edit', function (req, res){
    let id = Number(req.params.id)
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            let isFound = false
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    isFound = true
                    if(req.body.first_name){
                        data[i].first_name = req.body.first_name
                    }
                    if(req.body.last_name){
                        data[i].last_name = req.body.last_name
                    }
                    if(req.body.email){
                        data[i].email = req.body.email
                    }
                }
            }

            if(!isFound){
                res.send(`Error. No student with ID = ${id}`)
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
    const email = req.params.email
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err){
            res.send(err)
        } else {
            data = JSON.parse(data)
            let result = []

            for(let i = 0; i < data.length; i++){
                if(email === data[i].email){
                    result.push(data[i])
                }
            }

            if (result.length >= 1) {
                res.render('students', { students: result })
            } else {
                res.send(`No student with email = ${email}`)
            }
        }
    })
})

module.exports = router