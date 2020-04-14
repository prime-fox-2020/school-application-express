const fs = require('fs')

class Subject{
    constructor(id,subject_name){
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

    static editSubject (id,cb){
        this.readJSON((err,data)=>{
            if(err){
                cb(err,null)
            }else{
                let editAsId = []
                for(var i = 0 ; i <data.length ; i ++){
                    if(id == data[i].id){
                        editAsId.push(new Subject (data[i].id,data[i].subject_name))
                    }
                }
                cb(null,editAsId)
            }
        })

    }

    static rewrite(data,cb){
        fs.writeFile(`./subjects.json`, JSON.stringify(data, null, 4), (err,data) => {
          if (err) {
          cb(err,null)
          }else{
          cb(null, "berhasil")
          }
      })
    }


}

module.exports = Subject