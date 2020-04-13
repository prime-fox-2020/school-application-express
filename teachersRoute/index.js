
const routerTeacher = require(`express`).Router()
const fs = require(`fs`)


routerTeacher.get(`/`,(req,res)=>{

    let dataTheachers = fs.readFileSync(`./teachers.json`,`utf8`)
    dataTheachers = JSON.parse(dataTheachers)

    res.render(`teachers`,{dataTheachers})
})

routerTeacher.get(`/:id`,(req,res) =>{
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


module.exports = routerTeacher