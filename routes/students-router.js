const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            res.send(`<h3>Data Students</h3> ${JSON.stringify(dataParse, null, 4)}`)        
        }
    })
})

router.get('/:email', (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let dataEmail = []
            for (let i in dataParse) {
                if (req.params.email === dataParse[i].email) {
                    dataEmail.push(dataParse[i])
                }
            }

            if (dataEmail.length === 0) {
                res.send(`<h3>Data Students dengan EMAIL ${req.params.email}  tidak ada</h3>`)        
            } else {
                res.send(`<h3>Data Students dengan EMAIL ${req.params.email}</h3> ${JSON.stringify(dataEmail, null, 4)}`)        
            }
        }
    })
})

module.exports = router

