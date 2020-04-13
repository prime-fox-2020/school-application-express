const routes = require('express').Router()
const fs = require('fs')
//convert file 
routes.get('/teachers', (req, res) => {
    fs.readFile('./JSON/teachers.JSON', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const teachersParse = JSON.parse(data)
            res.render('teachers',{
                teachersParse
            })
        //     const teachersData = JSON.parse(data)

        //    let list2 = ` Teachers's List`
        //     for (let i = 0; i < teachersData.length; i++) {
        //         list2 += `<br>`
        //         list2 += `${JSON.stringify(teachersData[i],null,2)}`
        //     }

        //     res.send(list2)
        }
    })
})

routes.get('/teachers/:id',(req,res) => {
    fs.readFile('./JSON/teachers.JSON','utf8',(err,data) =>{
        if(err){
            console.log(err)
        }else{
            const teachersData = JSON.parse(data)
            

            for(let i = 0; i<teachersData.length;i++){
                if(teachersData[i].id == req.params.id){
                    res.send(teachersData[i])
                }
            }
        }
    })
})

module.exports = routes