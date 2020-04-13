const routes = require('express').Router()
const fs = require('fs')

routes.get('/student', (req,res) => {
    fs.readFile('./data/students.json','utf-8', (err,data) => {
        if (err){ 
            res.send(err)
        }
        else {
            let dataStudent = JSON.parse(data)
            // res.send(`This is students list\n
            // ${dataStudent}`)
            res.send(dataStudent)
        }
    })
})

module.exports = routes