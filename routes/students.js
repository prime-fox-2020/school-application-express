const { Router } = require('express')
const router = Router()

const fs = require('fs')

// fs.readFile('../students.json', 'utf8', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         let students_list = JSON.parse(data)
//         console.log(students_list[0])
//     }
// })

router.get('/students', function (req, res) {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let students_list = JSON.parse(data)
            // res.send(students_list)
            res.render('students', { students_list })
        }
    })
})


router.get('/students/add', (req, res) => {
    res.render('addStudent')
})

router.post('/students/add', (req, res) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const gender = req.body.gender
    const birth_date = req.body.birth_date

    //read
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let students_list = JSON.parse(data)
            let temp = {
                "id": students_list[students_list.length - 1].id + 1,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "gender": gender,
                "birth_date": birth_date
            }
            students_list.push(temp)
            fs.writeFileSync(`./students.json`, JSON.stringify(students_list, null, 2), 'utf8')
            res.render('students', { students_list })
        }
    })
})

router.get('/students/:id?/edit', (req, res) => {
    //read
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let students_list = JSON.parse(data)
            let length = students_list.length
            for (let i = 0; i < length + 1; i++) {
                if (req.params.id == students_list[i].id) {
                    let dataById = students_list[req.params.id - 1]
                    res.render('editStudent', { dataById })
                    break
                }
            }
        }
    })
})

router.post('/students/:id?/edit', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let students_list = JSON.parse(data)

            const id = req.params.id
            const first_name = req.body.first_name
            const last_name = req.body.last_name
            const email = req.body.email
            const gender = req.body.gender
            const birth_date = req.body.birth_date

            let temp = {
                "id": req.params.id,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "gender": gender,
                "birth_date": birth_date
            }

            students_list[req.params.id - 1] = temp
            fs.writeFileSync(`./students.json`, JSON.stringify(students_list, null, 2), 'utf8')
            res.render('students', { students_list })
        }
    })
})

// router.post('/students/:id?/delete', (req, res) => {
//     fs.readFile('./students.json', 'utf8', (err, data) => {
//         if (err) {
//             res.send(err)
//         } else {
//             let students_list = JSON.parse(data)
//             let length = students_list.length
//             let afterDelete = []
//             for (let i = 0; i < length; i++) {
//                 if (req.params.id != students_list[i].id) {
//                     afterDelete.push(students_list[i])
//                 }
//             }
//             res.send(afterDelete)
//         }
//     })
// })

router.get('/students/:id/delete', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    let students_list = JSON.parse(data)
                    let length = students_list.length
                    let afterDelete = []
                    for (let i = 0; i < length; i++) {
                        if (req.params.id != students_list[i].id) {
                            afterDelete.push(students_list[i])
                        }
                    }
                    students_list = afterDelete
                    fs.writeFileSync(`./students.json`, JSON.stringify(students_list, null, 2), 'utf8')

                    res.redirect('/students')
                }
            })
})

module.exports = router