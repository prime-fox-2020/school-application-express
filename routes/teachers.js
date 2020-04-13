const fs = require('fs')
const express = require('express')
const routes = express.Router()

routes.get('/:id?', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            if(req.params.id){
                const parseData = JSON.parse(data)
                const list_teachers = parseData.filter( list => list.id === Number(req.params.id))
                res.render('teachers', { list_teachers })
                // res.send({list_teachers})
            }
            else{
                const list_teachers = JSON.parse(data)
                res.render('teachers', { list_teachers })
                // res.send({list_teachers})
            }
        } 
    })
})

module.exports = routes