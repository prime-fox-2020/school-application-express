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

routes.get('/add',(req,res) =>{
    res.render('add_student')
})

routes.post('/add', (req,res) =>{
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    
    if (first_name && last_name && email){
        fs.readFile('./data/students.json','utf-8', (err,data) => {
            if(err) {res.send(err)}
            else {
                let id = 0
                let dataParse = JSON.parse(data)
                if(dataParse.length==0){
                    id = 1
                } else {
                    id = dataParse[dataParse.length - 1].id +1
                }
                let obj = {}
                obj.id = id
                obj.first_name = first_name
                obj.last_name = last_name
                obj.email = email
                dataParse.push(obj)
                let dataStringify = JSON.stringify(dataParse,null,2)
                fs.writeFile('./data/students.json',dataStringify,(err) => {
                    if (err) {res.send(err)}
                    else {
                        res.redirect('/students')
                    }
                })
            }
        })
    }
})

routes.get('/:id/edit', (req,res) => {
    fs.readFile('./data/students.json', 'utf-8', (err,data) => {
        if (err) {res.send(err)}
        else {
            let dataStudent = JSON.parse(data)
            let id
            let result
            let flag = false

            dataStudent.forEach(item => {
                if (item.id == req.params.id){
                    id = item.id
                    result = item
                    flag = true
                }
            })
            if(!flag){
                res.send('Wrong email entered')
            } else {
                // console.log(`${id} ${result.first_name} ${result.id}`)
                res.render('edit_student',{result,id})
            }
        }
    })
})

routes.post('/:id/edit', (req,res) => {
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    console.log(`${first_name} ${last_name} ${email} ${req.params.id}`)
    
    if(first_name && last_name && email){
        fs.readFile('./data/students.json','utf-8',(err,data) => {
            if(err) {res.send(err)}
            else {
                // let id = req.params.id
                let dataStudent = JSON.parse(data)
                let result = []

                for (let i = 0; i<dataStudent.length; i++){
                    if (dataStudent[i].id == req.params.id){
                        let obj = {}
                        obj.id = Number(req.params.id)
                        obj.first_name = first_name
                        obj.last_name = last_name
                        obj.email = email
                        result.push(obj)
                    } else {
                        result.push(dataStudent[i])
                    }
                }
                let dataStringify = JSON.stringify(result,null,2)
                fs.writeFile('./data/students.json', dataStringify, (err) => {
                    if (err) {res.send(err)}
                    else {
                        res.redirect('/students')
                    }
                })
            }
        })
    }
})

routes.get('/:id/delete', (req,res) => {
    fs.readFile('./data/students.json','utf-8', (err,data) => {
        if (err) {res.send(err)}
        else {
            let dataStudent = JSON.parse(data)
            let id = req.params.id
            let result = []

            for (let i= 0; i<dataStudent.length; i++){
                if (dataStudent[i].id == Number(id)){
                    newID = i
                } else {
                    result.push(dataStudent[i])
                }
            }
            for(let j=newID; j<result.length; j++){
                result[j].id--
            }
            let dataStringify = JSON.stringify(result,null,2)
            fs.writeFile('./data/students.json',dataStringify, (err) =>{
                if(err) {res.send(err)}
                else {
                    res.redirect('/students')
                }
            })
        }
    })
})

routes.get('/:email', (req,res) => {
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