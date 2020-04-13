const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile("./subjects.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            res.render('subjects-view.ejs', {dataParse})        
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
                res.send(`<h3>Tidak ada data Subjects dengan ID: ${req.params.id}</h3>`)        
            } else {
                res.send(`<h3>Data Subjects dengan id ${req.params.id}</h3>
                <p>ID: ${dataId[0].id}</p>
                <p>Nama Subject: ${dataId[0].subject_name}</p>`)        
            } 
        }
    })
})


module.exports = router

