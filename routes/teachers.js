const fs = require('fs')
const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    fs.readFile('./teachers.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            res.render('./teachers.ejs', { data })
        }
    })
})

router.get('/:id', (req, res) => {
    fs.readFile('./teachers.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            const idTeach = req.params.id

            let result = null

            for (var i = 0; i < data.length; i++) {
                if (parseInt(idTeach) === data[i].id) {
                    result = data[i]
                }
            }
            if (result) {
                data = data.filter(data => data.id === parseInt(req.params.id))
                res.render('./teachers.ejs', { data })
            }
            else {
                res.send('Tidak ada id tersebut')
            }
        }
    })
})

module.exports = router