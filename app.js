const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, ()=>{

    console.log(`tes Running whith port : 3000`)
})


app.get(`/`,(req,res)=>{

    res.send(`This is Homepage`)
})

app.get(`/teachers`,(req,res) =>{

    res.send(`ini data teachers`)
})

app.get(`/teachers/:id`,(req,res) =>{
    const id = req.params.id
    let data = fs.readFileSync(`./teachers.json`,`utf8`)
    data = JSON.parse(data)

    let cek = false
    for (let i = 0; i < data.length; i++) {
        if(data[i].id == id){
            res.send(data[i])
            cek = true
        }
    }

    if(!cek){
        res.send(`data teacher dengan id = ${id}, tidak ditemukan`)
    }
})


app.get(`/students`,(req,res) =>{

    res.send(`ini data students`)
})

app.get(`/students/:email`,(req,res) =>{
    const email = req.params.email
    let data = fs.readFileSync(`./student.json`,`utf8`)
    data = JSON.parse(data)

    let cek = false
    for (let i = 0; i < data.length; i++) {
        if(data[i].email == email){
            res.send(data[i])
            cek = true
        }
    }

    if(!cek){
        res.send(`data Student dengan email: ${email}, tidak ditemukan`)
    }
})

app.get(`/subjects/:subject`,(req,res) =>{
    const subject = req.params.subject
    let data = fs.readFileSync(`./subjects.json`,`utf8`)
    data = JSON.parse(data)

    let cek = false
    for (let i = 0; i < data.length; i++) {
        if(data[i].subject_name == subject){
            res.send(data[i])
            cek = true
        }
    }

    if(!cek){
        res.send(`data subject dengan nama: ${subject}, tidak ditemukan`)
    }
})

app.get(`/subjects`,(req,res) =>{
    res.send(` ini data subjects`)
})