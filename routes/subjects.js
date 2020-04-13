const routes = require('express').Router()
const fs = require('fs')
//convert file 
routes.get('/subjects',(req,res) => {
    fs.readFile('./JSON/subjects.JSON','utf8',(err,data)=>{
        if(err){
            console.log(err)
        }else{
            const subjectsParse = JSON.parse(data)
            res.render('subjects',{
                subjectsParse
            })
            // const subjectsData = JSON.parse(data)
            // // console.log(studentData)
            // let list = ` Subjects's List`
            // for (let i = 0; i < subjectsData.length; i++) {
            //     list += `<br>`
            //     list += `${JSON.stringify(subjectsData[i],null,2)}`
            // }

            // res.send(list)
        }
    })
})
routes.get('/subjects/:id',(req,res) => {
    fs.readFile('./JSON/subjects.JSON','utf8',(err,data) =>{
        if(err){
            console.log(err)
        }else{
            const subjectsData = JSON.parse(data)
        
            for(let i = 0; i<subjectsData.length;i++){
                if(subjectsData[i].id == req.params.id){
                    res.send(subjectsData[i])
                }
            }
        }
    })
})
module.exports = routes