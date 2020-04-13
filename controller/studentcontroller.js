const Students = require ('../models/students')

class Controller {
    constructor(){
    }

    static viewStudents(req,res){
        Students.viewStudents((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        })
    }

    static addStudent(id,first_name,last_name,email,gender){
        return Students.addStudent(id,first_name,last_name,email,gender)
    }

    static deleteStudent(){
        
    }

}


module.exports = Controller