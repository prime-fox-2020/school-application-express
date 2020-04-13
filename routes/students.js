const { Router } = require('express')
const router = Router()

const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })

})

module.exports = router