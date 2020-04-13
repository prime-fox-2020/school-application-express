const Students = require ('../models/students')

class Controller {
    constructor(){
    }

    static viewStudents(req,res){
        Students.viewStudents((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.render("students",{data})
            }
        })
    }

    static editStudent(req,res){
        const id = req.params.id
  
        Students.editStudent(id,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                console.log(data[0].id)
                res.render('studentedit',{data})
            }

        })
    }

    static changeStudent(req,res){
        const body = req.body
        Students.changeStudent(body,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.render('students',{data})
            }

        })
    }


    static addStudent(id,first_name,last_name,email,gender){
        return Students.addStudent(id,first_name,last_name,email,gender)
    }

    static deleteStudent(req,res){
        const id = req.params.id
        console.log (id)
        Students.deleteStudent(id,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.render('students',{data})
            }

        }) 
    }

}


module.exports = Controller