const fs = require('fs')
const express = require('express')
const routes = express.Router()

routes.get('/:id?', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            if(req.params.id){
                const parseData = JSON.parse(data)
                const list_subjects = parseData.filter( list => list.id === Number(req.params.id))
                res.render('subjects', {list_subjects})
                // res.send(list_subjects)
            }
            else{
                const list_subjects = JSON.parse(data)
                res.render('subjects', {list_subjects})
                // res.send(list_subjects)
            }
        } 
    })
})

module.exports = routes