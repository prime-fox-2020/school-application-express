const fs = require('fs')

class Student {
    constructor(id,first_name,last_name,email,gender){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.gender = gender;
    }


    static readJSON(cb){
        fs.readFile('./data/students.json','utf8',(err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let dataparse = JSON.parse(data)
                cb(null,dataparse)
            }
        })
    }


    static viewStudents(cb){
        this.readJSON((err,data)=>{
            if (err){
                cb(err,null)
            }else{
                cb(null,data)
            }
        })
    }


    static write (data,cb){

    }


    //static save()
    static addStudent(){
        let readStudents = this.readJSON


        readStudents.push(new Student(id,first_name,last_name,email,gender))
        fs.writeFileSync('./data/students.json')
        
        
    }

}




module.exports = Student

