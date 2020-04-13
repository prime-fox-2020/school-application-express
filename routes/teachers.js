const {Router} = require('express')
const router = Router()

const fs = require ('fs')

router.get('/', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)          
        }
    })
})

router.get('/:id', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
        if(err){
            res.send(err)
        } else {
            data = JSON.parse(data)
            let result = null

            const idTeachers = req.params.id
            for(let i = 0; i < data.length; i++){
                if(Number(idTeachers) === data[i].id){
                    result = data[i]
                }
            }
            if (result) {
                res.send(result)
            } else {
                res.send('not found')
            }
        }
    })
})

module.exports = router