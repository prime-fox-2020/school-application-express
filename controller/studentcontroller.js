const Students = require ('../models/students')

class Controller {

    static viewStudents(req,res){
        Students.viewStudents((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.render("students",{data})
            }
        })
    }

    static edit(req,res){
        const id = req.params.id
        Students.edit(id,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                console.log(data[0].id)
                res.render('studentedit',{data})
            }

        })
    }

    static change(req,res){
        const body = req.body
        Students.change(body,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.redirect('/students')
            }

        })
    }
    
    static delete(req,res){
        const id = req.params.id
        console.log (id)
        Students.delete(id,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.redirect('/students')
            }
            
        }) 
    }

    static addForm(req,res){
        res.render("studentadd")
    }


    static add(req,res){
        const body = req.body
        Students.add(body,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.redirect('/students')
            }

        })
    }

    static selectEmail(req,res){
        const email = req.params.email
        Students.selectEmail(email,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.render('students',{data})
            }

        })

    }

}


module.exports = Controller