const Teachers = require ('../models/teachers')

class Controller {
    constructor(){
    }

    static viewTeachers(req,res){
        Teachers.viewTeachers((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.render("teachers",{data})
            }
        })
    }

    static editTeacher(req,res){
        const id = req.params.id
        console.log(id)
        Teachers.editTeacher(id,(err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }

        })
    }

    static addTeacher(id,first_name,last_name,email,gender){
        return Teachers.addStudent(id,first_name,last_name,email,gender)
    }

    static deleteTeacher(){
        
    }

}


module.exports = Controller