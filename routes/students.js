const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    //res.send('this is students page')
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const parsData = JSON.parse(data)
            res.send(parsData)
        }
    })
})

router.get('/:email', (req, res) => {
    //res.send(`email students : ${req.params.email}`) // ambil data dari params tanpa json
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const emailParams = req.params.email
            const parsData = JSON.parse(data)

            for(let i=0; i<parsData.length; i++) {
                if(emailParams === parsData[i].email){
                    res.send(parsData[i])
                }
            }
        }
    })
})

module.exports = router