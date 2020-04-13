const fs = require('fs')
const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else res.send(JSON.parse(data))
    })
})

module.exports = routes