
const routerSubject = require(`express`).Router()
const fs = require(`fs`)

routerSubject.get(`/`,(req,res)=>{
    
    let dataSubjects= fs.readFileSync(`./subjects.json`,`utf8`)
    dataSubjects = JSON.parse(dataSubjects)

    res.render(`subjects`,{dataSubjects})
})

routerSubject.get(`/:subject`,(req,res) =>{
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


module.exports = routerSubject