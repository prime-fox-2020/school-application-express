const routes = require('express').Router()
const fs = require('fs')

routes.get('/', (req,res) => {
    fs.readFile('./data/students.json','utf-8', (err,data) => {
        if (err){ 
            res.send(err)
        }
        else {
            let dataStudent = JSON.parse(data)
            // res.send(dataStudent)
            res.render('students', {dataStudent})
        }
    })
})

routes.get('/:email?', (req,res) => {
    fs.readFile('./data/students.json', 'utf-8', (err,data) => {
        if (err) {res.send(err)}
        else {
            let dataStudent = JSON.parse(data)
            let email = req.params.email, result
            let flag = false

            dataStudent.forEach(item => {
                if (item.email == email){
                    result = item
                    flag = true
                }
            })
            if(!flag){
                res.send('Wrong email entered')
            } else {
                res.send(result)
            }
        }
    })
})

module.exports = routes