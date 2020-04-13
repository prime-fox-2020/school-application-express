const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    //res.send('this is subjects page')
    fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const parsData = JSON.parse(data)
            res.send(parsData)
        }
    })
})

router.get('/:id', (req, res) => {
    //res.send(`id subjects : ${req.params.id}`) // ambil data dari params tanpa json
    fs.readFile('./data/subjects.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const idParams = req.params.id
            const parsData = JSON.parse(data)

            for(let i=0; i<parsData.length; i++) {
                const idParams = Number(parsData[i].id)
                if(idParams === idParams){
                    res.send(parsData[i])
                }
            }
        }
    })
})

module.exports = router