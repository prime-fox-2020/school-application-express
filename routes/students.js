const { Router } = require('express')
const router = Router()

const fs = require('fs')
console.log(process.cwd());

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
            res.render('students', {students_list})
        }
    })
})

module.exports = router