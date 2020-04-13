const routes = require('express').Router()
const fs = require('fs')

routes.get('/subject', (req,res) => {
    fs.readFile('./data/subjects.json','utf-8', (err,data) => {
        if (err){ 
            res.send(err)
        }
        else {
            let dataSubject = JSON.parse(data)
            // res.send(`This is subjects list\n
            // ${dataStudent}`)
            res.send(dataSubject)
        }
    })
})

module.exports = routes