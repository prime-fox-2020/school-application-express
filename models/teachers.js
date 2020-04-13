const fs = require('fs')

class Teacher{
    constructor(id,first_name,last_name,email,gender){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
    }

    static readJSON(cb){
        fs.readFile('./data/teachers.json','utf8',(err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let dataparse = JSON.parse(data)
                cb(null,dataparse)
            }
        })
    }


    static viewTeachers(cb){
        this.readJSON((err,data)=>{
            if (err){
                cb(err,null)
            }else{
                cb(null,data)
            }
        })
    }

    static editTeacher (id,cb){
        this.readJSON((err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let editAsId = []
                for(var i = 0 ; i <data.length ; i ++){
                    if(id == data[i].id){
                        editAsId.push(new Teacher (data[i].id,data[i].first_name,
                            data[i].last_name,data[i].email,data[i].gender))
                    }
                }
                cb(null,editAsId)
            }
        })

    }



}



module.exports = Teacher