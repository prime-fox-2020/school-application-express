const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    //res.send('this is students page')
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const parsData = JSON.parse(data)
            //res.send(parsData)
            res.render('students.ejs', {parsData})
        }
    })
})


router.get('/add', (req, res) => {
    res.render('addStudents.ejs')
})


router.post('/add', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const parsData = JSON.parse(data)
            const newId = parsData[parsData.length-1].id+1

            parsData.push({
                "id" : newId,
                "first_name" : req.body.first_name,
                "last_name": req.body.last_name,
                "email" : req.body.email,
                "gender" : req.body.email,
                "birth_date" : req.body.birth_date
            })

            fs.writeFile('./data/students.json', JSON.stringify(parsData, null, 2), (err) => {
                if(err) {
                    res.send(err)
                } else {
                    res.redirect('/students')
                }
            })
        }
    })
})

router.get('/:id/edit', (req, res) => {
    //res.render('editStudents.ejs')
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err){
            res.send(err)
        } else {
            let result = null
            const parsData = JSON.parse(data)
            let idParams = Number(req.params.id)

            for(let i=0; i<parsData.length; i++){
                let idParse = parsData[i].id

                if(idParams === idParse){
                    result = parsData[i]
                    break
                }
            }

            if(result) {
                res.render('editStudents.ejs')
            } else {
                res.send('id students not found')
            }
        }
    })
})

router.post('/:id/edit', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err){
            res.send(err)
        } else {
            let result = null
            const parsData = JSON.parse(data)
            let idParams = Number(req.params.id)
            for(let i=0; i<parsData.length; i++) {
                if(idParams === parsData[i].id){
                    result = parsData[i]
                    parsData[i] = {
                        id : parsData[i].id,
                        first_name : req.body.first_name,
                        last_name : req.body.last_name,
                        email : req.body.email,
                        gender : req.body.gender,
                        birth_date : req.body.birth_date
                    }
                    break;
                }
            }

            fs.writeFile('./data/students.json', JSON.stringify(parsData, null, 2), (err) => {
                if(err) {
                    res.send(err)
                } else {
                    res.redirect('/students')
                }
            })
        }
    })
})


router.get('/:id/delete', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            let result = null
            const parsData = JSON.parse(data)
            let newData = []
            let idParams = Number(req.params.id)
            for(let i=0; i<parsData.length; i++) {
                if(idParams === parsData[i].id) {
                    result = parsData[i]
                } else {
                    newData.push(parsData[i])
                }
            }

            if(result) {
                fs.writeFile('./data/students.json', JSON.stringify(newData, null, 2), (err) => {
                    if(err){
                        res.send(err)
                    } else {
                        res.redirect('/students')
                    }
                })
            } else {
                res.send('id students not found')
            }
        }
    })
})

router.get('/:email', (req, res) => {
    //res.send(`email students : ${req.params.email}`) // ambil data dari params tanpa json
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const emailParams = req.params.email
            const parsData = JSON.parse(data)
            let result = null

            for(let i=0; i<parsData.length; i++) {
                if(emailParams === parsData[i].email){
                    result = parsData[i]
                } 
            }
            //res.send(result)
            if(result) {
                res.send(result)
            } else {
                res.send('email not found')
            }
        }
    })
})


module.exports = router