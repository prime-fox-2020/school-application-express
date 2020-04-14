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


    static edit (id,cb){
        this.readJSON((err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let editAsId = []
                for(var i = 0 ; i <data.length ; i ++){
                    if(id == data[i].id){
                        editAsId.push(new Student (data[i].id,data[i].first_name,
                            data[i].last_name,data[i].email,data[i].gender))
                    }
                }
                cb(null,editAsId)
            }
        })

    }

    static change (body,cb){
        this.readJSON((err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let editAs = []
                for(var i = 0 ; i <data.length ; i ++){
                    if(body.id == data[i].id){
                        editAs.push(new Student (body.id,body.first_name,
                            body.last_name,body.email,body.gender))
                    }else{
                        editAs.push(new Student (data[i].id,data[i].first_name,
                            data[i].last_name,data[i].email,data[i].gender))
                    }
                }
                cb(null,editAs)
                this.rewrite(editAs,(err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(data)
                    }
                })
            }
        })

    }

    static delete(id,cb){
        this.readJSON((err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let editAsId = []
                for(var i = 0 ; i <data.length ; i ++){
                    if(id !== data[i].id){
                        editAsId.push(new Student (data[i].id,data[i].first_name,
                            data[i].last_name,data[i].email,data[i].gender))
                    }
                }
                let dataEdited = editAsId
                //// tambahin fungsi rewrite JSON disini
                cb(null,dataEdited)
                this.rewrite(dataEdited,(err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(data)
                    }
                })

            }
        })
    }

    static add(body,cb){
        this.readJSON((err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let dataEdited = []
                for(var i = 0 ; i <data.length ; i ++){
                    dataEdited.push(new Student (data[i].id,data[i].first_name,
                        data[i].last_name,data[i].email,data[i].gender))
                    }
                    let newid = Number(data[data.length-1].id)+1
                    dataEdited.push(new Student (newid,body.first_name,
                        body.last_name,body.email,body.gender))

                cb(null,dataEdited)
                this.rewrite(dataEdited,(err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(data)
                    }
                })
                }
            })
    }

    static rewrite(data,cb){
          fs.writeFile(`./students.json`, JSON.stringify(data, null, 4), (err,data) => {
            if (err) {
            cb(err,null)
            }else{
            cb(null, "berhasil")
            }
        })
    }



}




module.exports = Student

