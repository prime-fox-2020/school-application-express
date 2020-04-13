const routes = require('express').Router()
const fs = require('fs')

routes.get('/teacher', (req,res) => {
    fs.readFile('./data/teachers.json','utf-8', (err,data) => {
        if (err){ 
            res.send(err)
        }
        else {
            let dataTeacher = JSON.parse(data)
            // res.send(`This is teacher list\n
            // ${dataTeacher}`)
            res.send(dataTeacher)
        }
    })
})

module.exports = routes