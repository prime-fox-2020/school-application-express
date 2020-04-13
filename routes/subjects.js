const { Router } = require('express')
const router = Router()

const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('subjects.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            res.render('./subjects.ejs', { data })
        }
    })
})

router.get('/:id', (req, res) => {
    fs.readFile('subjects.json', 'utf8', (err, data) => {
        if (err) {
            res.send(er)
        } else {
            data = JSON.parse(data)

            const idSubj = req.params.id

            let result = null
            for (var i = 0; i < data.length; i++) {
                if (Number(idSubj) === data[i].id) {
                    result = data[i]
                }
            }
            if (result) {
                data = data.filter(data => data.id === req.params.id)
                res.render('./subjects.ejs', { data })
            } else {
                res.send('Id tersebut tidak ada')
            }
        }
    })
})


module.exports = router