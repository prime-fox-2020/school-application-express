const fs = require('fs')

class Subject{
    constructor(){
        this.id = id
        this.subject_name = subject_name
    }

    static readJSON(cb){
        fs.readFile('./data/subjects.json','utf8',(err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let dataparse = JSON.parse(data)
                cb(null,dataparse)
            }
        })
    }


    static viewSubjects(cb){
        this.readJSON((err,data)=>{
            if (err){
                cb(err,null)
            }else{
                cb(null,data)
            }
        })
    }


}

module.exports = Subject