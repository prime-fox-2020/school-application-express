const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile("./teachers.json", "utf8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let dataParse = JSON.parse(data)
            res.render('teachers-view.ejs', {dataParse})        
        }
    })
})

router.get('/:id', (req, res) => {
    fs.readFile("./teachers.json", "utf8", (err, data) => {
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
                res.send(`<h3>Tidak ada data teachers dengan ID: ${req.params.id}</h3>`)        
            } else {
                res.send(`<h3>Data Teachers dengan id ${req.params.id}</h3>
                <p>ID: ${dataId[0].id}</p>
                <p>Nama Lengkap: ${dataId[0].first_name} ${dataId[0].last_name}</p>
                <p>Email: ${dataId[0].email}</p>
                <p>Gender: ${dataId[0].gender}</p>`)        
            } 
        }
    })
})


module.exports = router

