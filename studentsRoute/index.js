

const routerStudent = require(`express`).Router()
const fs = require(`fs`)


routerStudent.get(`/`,(req,res)=>{
    let dataStudents= fs.readFileSync(`./student.json`,`utf8`)
    dataStudents = JSON.parse(dataStudents)
    
    res.render('students',{dataStudents})
})

routerStudent.get(`/:email`,(req,res) =>{
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


module.exports = routerStudent