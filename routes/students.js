const {Router} = require('express')
const router = Router()

const fs = require ('fs')

router.get('/', (req, res) => {
    fs.readFile('./data/students.json', "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.get('/:email', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if(err){
            res.send(err)
        } else {

            data = JSON.parse(data)
            const emailStudents = req.params.email
            let result = null

            for(let i = 0; i < data.length; i++){
                if(emailStudents === data[i].email){
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