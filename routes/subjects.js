const routes = require('express').Router()
const fs = require('fs')

routes.get('/', (req,res) => {
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

routes.get('/:id?', (req,res) => {
    fs.readFile('./data/subjects.json', 'utf-8', (err,data) => {
        if (err) {res.send(err)}
        else {
            let dataSubject = JSON.parse(data)
            let id = req.params.id, result
            let flag = false

            dataSubject.forEach(item => {
                if (item.id == id){
                    result = item
                    flag = true
                }
            })
            if(!flag){
                res.send(err)
            } else {
                res.send(result)
            }
        }
    }) 
})

module.exports = routes