const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.render('teachers', { teachers: JSON.parse(data) })
        }
    })
})

router.get('/:id', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            const teacherID = req.params.id

            let result = []
            let isFound = false
            for(let i = 0; i < data.length; i++){
                if(Number(teacherID) === data[i].id){
                    result.push(data[i])
                    isFound = true
                }
            }

            if (!isFound || result.length < 1) {
                res.send(`There is no teacher with ID = ${ req.params.id }`)
            } else if (result.length >= 1) {
                res.render('teachers', { teachers: result })
            } else {
                res.send(err)
            }
        }
    })
})

module.exports = router