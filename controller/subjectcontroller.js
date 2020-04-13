const Subjects = require ('../models/subjects')


class Controller {
    constructor(){
    }

    static viewSubjects(req,res){
        Subjects.viewSubjects((err,data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        })
    }

    static addSubject(id,first_name,last_name,email,gender){
        return Subjects.addStudent(id,first_name,last_name,email,gender)
    }

    static deleteSubject(){
        
    }

}


module.exports = Controller