const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            res.render('students-view.ejs', {dataParse})        
        }
    })
})

router.get('/add', (req, res) => {
    res.render('add-students.ejs')
})

router.post('/add', (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let newId = dataParse[dataParse.length - 1].id + 1
            dataParse.push({
                "id": newId,
                "first_name": req.body.firstname,
                "last_name": req.body.lastname,
                "email": req.body.email,
                "gender": req.body.gender,
                "birth_date": req.body.birthdate
            })
            fs.writeFile("students.json", JSON.stringify(dataParse, null, 3), (err, data) => {
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
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let check = false
            let id = null
            let dataById = null
            for (let i = 0; i < dataParse.length; i++) {
                if (req.params.id == dataParse[i].id) {
                    id = dataParse[i].id
                    dataById = dataParse[i]
                    check = true
                }
            }
            if (check == false) {
                res.send(`Data students dengan id ${req.params.id} tidak ada`)
            } else {
                res.render('edit-students.ejs', {id, dataById})        
            }
        }
    })    
}) 

router.post('/:id/edit', (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let newData = []
            for (let i = 0; i < dataParse.length; i++) {
                if (req.params.id == dataParse[i].id) {
                    newData.push(dataParse[i])
                    dataParse[i].first_name = req.body.firstname || dataParse[i].first_name
                    dataParse[i].last_name = req.body.lastname || dataParse[i].last_name
                    dataParse[i].email = req.body.email || dataParse[i].email
                    dataParse[i].gender = req.body.gender || dataParse[i].gender
                    dataParse[i].birth_date = req.body.birthdate || dataParse[i].birth_date
                }
            }
            if (newData.length === 0) {
                res.send(`Data students dengan id ${req.params.id} tidak ada`)
            } else {
                fs.writeFile("students.json", JSON.stringify(dataParse, null, 3), (err, data) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.redirect('/students')        
                    }
                })
            }

        }
    })    
    
})

router.get('/:id/delete', (req, res) => {
    fs.readFile("students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let newData = []
            for (let i = 0; i < dataParse.length; i++) {
                if (dataParse[i].id != req.params.id) {
                    newData.push(dataParse[i])
                }
            }
            if (newData.length !== 0) {
                fs.writeFile("students.json", JSON.stringify(newData, null, 3), (err, data) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.redirect('/students')        
                    }
                })
            }
        }
    })
}) 

router.get('/:email', (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let dataEmail = []
            for (let i in dataParse) {
                if (req.params.email === dataParse[i].email) {
                    dataEmail.push(dataParse[i])
                }
            }

            if (dataEmail.length === 0) {
                res.send(`<h3>Data Students dengan EMAIL ${req.params.email}  tidak ada</h3>`)        
            } else {
                res.send(`<h3>Data Students dengan email ${req.params.email}</h3>
                <p>ID: ${dataEmail[0].id}</p>
                <p>Nama Lengkap: ${dataEmail[0].first_name} ${dataEmail[0].last_name}</p>
                <p>Email: ${dataEmail[0].email}</p>
                <p>Gender: ${dataEmail[0].gender}</p>
                <p>Gender: ${dataEmail[0].birth_date}</p>`)
            }
        }
    })
})


module.exports = router

