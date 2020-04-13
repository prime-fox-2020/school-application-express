

const routerStudent = require(`express`).Router()
const fs = require(`fs`)


routerStudent.get(`/`,(req,res)=>{
    let dataStudents= fs.readFileSync(`./student.json`,`utf8`)
    dataStudents = JSON.parse(dataStudents)

    res.render('students',{dataStudents})
})


routerStudent.get(`/add`,(req,res)=>{
    res.render(`student_add`)
})

routerStudent.post(`/add`,(req,res)=>{
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const gender = req.body.gender
    const birth_date = req.body.birth_date
    const email = req.body.email

    let data = fs.readFileSync(`./student.json`,`utf8`)
    data = JSON.parse(data)

    newId = data[data.length-1].id +1
    data.push({
        id: newId,
        first_name:first_name,
        last_name:last_name,
        email:email,
        gender: gender,
        birt_date:birth_date
    })
    fs.writeFileSync(`./student.json`,JSON.stringify(data,null,2))
    res.redirect(`/students`)
})

routerStudent.get(`/:id/edit`,(req,res)=>{
    let id = req.params.id
    res.render(`student_edit`,{id})

})

routerStudent.post(`/:id/edit`,(req,res)=>{
    const id = req.params.id
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const gender = req.body.gender
    const birth_date = req.body.birth_date
    const email = req.body.email

    let data = fs.readFileSync(`./student.json`,`utf8`)
    data = JSON.parse(data)

    newId = data[data.length-1].id +1
    for (let i = 0; i < data.length; i++) {
        if(id==data[i].id){
            data[i] = {
            id: newId,
            first_name:first_name,
            last_name:last_name,
            email:email,
            gender: gender,
            birt_date:birth_date
            }
        }
    }
    fs.writeFileSync(`./student.json`,JSON.stringify(data,null,2))
    res.redirect(`/students`)

})

routerStudent.get(`/:id/hapus`,(req,res)=>{
    let id = req.params.id
    res.render(`student_delete`,{id})

})

routerStudent.post(`/:id/hapus`,(req,res)=>{
    const id = req.params.id

    let data = fs.readFileSync(`./student.json`,`utf8`)
    data = JSON.parse(data)
    newData =[];

    let newId=1
    for (let i = 0; i < data.length; i++) {
        
        if(id != data[i].id){
            newData.push({
            id: newId,
            first_name:data[i].first_name,
            last_name:data[i].last_name,
            email:data[i].email,
            gender:data[i].gender,
            birt_date:data[i].birt_date

            })
            newId ++
        }
    }
    fs.writeFileSync(`./student.json`,JSON.stringify(newData,null,2))
    res.redirect(`/students`)

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