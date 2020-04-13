const routes = require('express').Router()
const fs = require('fs')

routes.get('/', (req,res) => {
    fs.readFile('./data/teachers.json','utf-8', (err,data) => {
        if (err){ 
            res.send(err)
        }
        else {
            let dataTeacher = JSON.parse(data)
            res.render('teacher',{dataTeacher})
            // res.send(dataTeacher)
        }
    })
})

routes.get('/:id?', (req,res) => {
    fs.readFile('./data/teachers.json','utf-8', (err, data) => {
        if (err){ res.send(err)}
        else {
            let dataTeacher = JSON.parse(data)
            let id = req.params.id , result
            let flag = false
            
            dataTeacher.forEach(item => {
                if (item.id == id){
                    result = item
                    flag = true
                }
            })
            if(!flag){
                res.send('wrong ID input')
            } else {
                res.send(result)
            }
        }
    })
})

module.exports = routes