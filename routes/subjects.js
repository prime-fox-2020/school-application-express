const {Router} = require('express')
const router = Router()

const fs = require ('fs')

router.get('/', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.render('subjects', { subjects: JSON.parse(data) })
        }
    })
})

router.get('/:id', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
        if(err){
            res.send(err)
        } else {
            data = JSON.parse(data)
            let result = []
            const idSubjects = req.params.id
            if (idSubjects > data.length) {
                res.send('subject not found')
            } else {
                for(let i = 0; i < data.length; i++){
                    if(Number(idSubjects) === data[i].id){
                        result.push(data[i])
                    }
                }
            }

            if (result) {
                res.render('subjects', { subjects: result })
            } else {
                res.send(err)
            }
        }
    })
})

module.exports = router