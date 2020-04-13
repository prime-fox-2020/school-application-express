const {Router} = require('express')
const router = Router()

const fs = require ('fs')

router.get('/subjects', function (req, res){
    fs.readFile('./subjects.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let subjects_list = JSON.parse(data)
            // res.send(students_list)
            res.render('subjects', {subjects_list})
        }
    })
})

module.exports = router