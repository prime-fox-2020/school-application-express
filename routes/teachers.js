const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    //res.send('this is teachers page')
    fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const parsData = JSON.parse(data)
            //res.send(parsData)
            res.render('teachers.ejs', {parsData})
        }
    })
})

router.get('/:id', (req, res) => {
    //res.send(`id teacher : ${req.params.id}`) // ambil data dari params tanpa json
    fs.readFile('./data/teachers.json', 'utf8', (err, data) => {
        if(err) {
            res.send(err)
        } else {
            const id = req.params.id
            const parsData = JSON.parse(data)
            let result = null
            for(let i=0; i<parsData.length; i++) {
                const parsId =parsData[i].id
                if(Number(id) === parsId){
                    result = parsData[i]
                }
            }

            if(result){
                res.send(result)
            } else {
                res.send('id not found')
            }
        }
    })
})

module.exports = router