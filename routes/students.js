const fs = require('fs')
const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            const list_students = JSON.parse(data)
            res.render('students', {list_students})
        } 
    })
})
routes.get('/add', (req, res) =>{
    res.render('add_student')
})

routes.get('/:email?', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            if(req.params.email && isNaN(req.params.email)){
                const parseData = JSON.parse(data)
                const list_students = parseData.filter( (list) => list.email === req.params.email)
                res.render('students', {list_students})
            }
            else{
                const list_students = JSON.parse(data)
                res.render('students', {list_students})
            }
        } 
    })
})

routes.get('/:id/edit', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            const parseData = JSON.parse(data)
            const detail_student = parseData.filter( (list) => list.id === Number(req.params.id))
            // res.send('Edit')
            res.render('edit_student', {detail_student})
        } 
    })
})

routes.post('/:id/edit', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            let parseData = JSON.parse(data)
            parseData.forEach( (list) => {
                if(list.id === Number(req.body.id)){
                    list.first_name = req.body.first_name
                    list.last_name = req.body.last_name
                    list.email = req.body.email
                    list.birth_date = req.body.birth_date
                }
            })
            fs.writeFile('./data/students.json', JSON.stringify(parseData, null, 2), (err) =>{
                if(err) res.send(err)
                const list_students = parseData
                res.render('students', {list_students})
            })
        } 
    })
})

routes.post('/add', (req,res) => {
    fs.readFile('./data/students.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            const parseData = JSON.parse(data)
            const len = parseData.length - 1
            const nextIndex = parseData[len].id + 1
            parseData.push({
                "id" : nextIndex,
                "first_name" : req.body.first_name ,
                "last_name" : req.body.last_name ,
                "email" : req.body.email ,
                "gender" : req.body.gender ,
                "birth_date" : req.body.birth_date
            })
            fs.writeFile('./data/students.json', JSON.stringify(parseData, null, 2), (err) =>{
                if(err) res.send(err)
                const list_students = parseData
                res.render('students', {list_students})
            })
        } 
    })

})

routes.get('/:id/delete', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            const parseData = JSON.parse(data)
            const filterData = []
            parseData.forEach( (list) => {
                if(list.id !== Number(req.params.id)){
                    filterData.push(list)
                }
            })
            fs.writeFile('./data/students.json', JSON.stringify(filterData, null, 2), (err) =>{
                if(err) res.send(err)
                const list_students = filterData
                res.render('students', {list_students})
            })
        } 
    })
})

module.exports = routes