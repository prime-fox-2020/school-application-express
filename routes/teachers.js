const {Router} = require('express')
const router = Router()

const fs = require ('fs')

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
        if(err){
            res.send(err)
        } else {
            data = JSON.parse(data)
            let result = []
            const idTeachers = req.params.id
            if (idTeachers > data.length) {
                res.send('student not found')
            } else {
                for(let i = 0; i < data.length; i++){
                    if(Number(idTeachers) === data[i].id){
                        result.push(data[i])
                    }
                }
            }
            if (result) {
                res.render('teachers', { teachers: result })
            } else {
                res.send(err)
            }
        }
    })
})

module.exports = router