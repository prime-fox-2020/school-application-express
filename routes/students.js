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
    fs.readFile("./data/students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let id = null
            let students = null
            for (let i = 0; i < dataParse.length; i++) {
                if (req.params.id == dataParse[i].id) {
                    id = dataParse[i].id
                    students = dataParse[i]
                }
            }

            res.render('editStudents.ejs', {id, students})        
        }
    })    
}) 

router.post('/:id/edit', (req, res) => {
    fs.readFile("./data/students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let newData = []
            let idParams = Number(req.params.id)
            for (let i = 0; i < dataParse.length; i++) {
                let idParse = dataParse[i].id
                if (idParams == idParse ) {
                    newData.push(dataParse[i])
                    dataParse[i].first_name = req.body.firstname 
                    dataParse[i].last_name = req.body.lastname 
                    dataParse[i].email = req.body.email 
                    dataParse[i].gender = req.body.gender 
                    dataParse[i].birth_date = req.body.birthdate 
                }
            }
            
            fs.writeFile("./data/students.json", JSON.stringify(dataParse, null, 3), (err, data) => {
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