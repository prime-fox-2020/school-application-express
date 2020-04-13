const routes = require('express').Router()
const fs = require('fs')
//convert file 

routes.get('/students', (req, res) => {
    fs.readFile('./JSON/students.JSON', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const studentsParse = JSON.parse(data)
            res.render('students', {
                studentsParse
            })
        }
    })
})

routes.get('/students/add', (req, res) => {
    res.render('add_students')
})

routes.post('/students/add', (req, res) => {
    fs.readFile('./JSON/students.JSON', 'utf8', (err, data) => {
        if (err) console.log(err);

        const studentsData = JSON.parse(data)
        const idx = studentsData[studentsData.length - 1].id + 1
        studentsData.push({
            "id": idx,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "gender": req.body.gender,
            "birth_date": req.body.birth_date
        })
        fs.writeFile('./JSON/students.JSON', JSON.stringify(studentsData, null, 2), (err, data) => {
            if (err) {
                console.log(err)
            } else {
                studentsParse = studentsData
                res.render('students', {studentsParse})
            }
        })
    })
    // res.send('New Student Registered')

})

routes.get('/students/edit', (req, res) => {
    res.render('edit_students')
})

routes.post('/students/edit', (req, res) => {
    fs.readFile('./JSON/students.JSON', 'utf8', (err, data) => {
        if (err) console.log(err);
        let count = 0
        const studentsData = JSON.parse(data)
        for (let i = 0; i < studentsData.length; i++) {
            if (req.body.id == studentsData[i].id) {
                studentsData[i].first_name = req.body.first_name
                studentsData[i].last_name = req.body.last_name
                studentsData[i].email = req.body.email
                studentsData[i].gender = req.body.gender
                studentsData[i].birth_date = req.body.birth_date
            } else {
                count++
            }
        }
        if (count == studentsData.length) {
            res.render(`Invalid Student Id!`)
        }

        fs.writeFile('./JSON/students.JSON', JSON.stringify(studentsData, null, 2), (err, data) => {
            if (err) console.log(err)

            let studentsParse = studentsData
            res.render('students', {studentsParse})
        })
    })
})

routes.get('/students/delete', (req, res) => {
    res.render('delete_students')
})

routes.post('/students/delete', (req, res) => {
    fs.readFile('./JSON/students.JSON', 'utf8', (err, data) => {
        if (err) console.log(err);

        const studentsData = JSON.parse(data)
        let newStudentsData = []
        let deletedData =[]
        for (let i = 0; i < studentsData.length; i++) {
            if (req.body.id !== studentsData[i].id) {
                newStudentsData.push(studentsData[i])
            }else{
                deletedData.push(studentsData[i])
            }
        }
        fs.writeFile('./JSON/students.JSON', JSON.stringify(newStudentsData, null, 2), (err, data) => {
            if (err) console.log(err)

            let studentsParse = newStudentsData
            res.render('students',{studentsParse})
        })
    })
})
routes.get('/students/:email', (req, res) => {
    fs.readFile('./JSON/students.JSON', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const studentsData = JSON.parse(data)


            for (let i = 0; i < studentsData.length; i++) {
                if (studentsData[i].email == req.params.email) {
                    res.send(studentsData[i])
                }
            }
        }
    })
})
module.exports = routes