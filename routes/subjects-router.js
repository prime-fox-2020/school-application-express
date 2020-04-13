const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile("./subjects.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            res.send(`<h3>Data Subjects</h3> ${JSON.stringify(dataParse, null, 4)}`)        
        }
    })
})

router.get('/:id', (req, res) => {
    fs.readFile("./subjects.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            let dataId = []
            for (let i in dataParse) {
                if (Number(req.params.id) === dataParse[i].id) {
                    dataId.push(dataParse[i])
                }
            }

            if (dataId.length === 0) {
                res.send(`<h3>Data Subjects dengan ID ${req.params.id} tidak ada</h3>`)        
            } else {
                res.send(`<h3>Data Subjects dengan ID ${req.params.id}</h3> ${JSON.stringify(dataId, null, 4)}`)        
            }
        }
    })
})


module.exports = router

