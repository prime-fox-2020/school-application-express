const fs = require('fs')

class Student {
    constructor(id, a, b, c, d, e){
        this.id = id
        this.first_name = a
        this.last_name = b
        this.email = c
        this.gender = d
        this.birthdate = e
    }
}

class model{
    static readTeacher(){
        let teacher = JSON.parse(fs.readFileSync('./teacher.json', 'utf8'))
        return teacher
    }

    static readStudent(){
        let students = JSON.parse(fs.readFileSync('./students.json', 'utf8'))
        return students
    }

    static readSubject(){
        let subjects = JSON.parse(fs.readFileSync('./subjects.json', 'utf8'))
        return subjects
    }

    static addStudent(fname, lname, email, gender, birthDate){
        let data = model.readStudent()
        data.push(new Student(data[data.length-1].id+1, fname, lname, email, gender, birthDate))
        model.writeStudent(data)
    }

    static writeStudent(data){
        fs.writeFileSync('./students.json', JSON.stringify(data, null, 4))
    }

    static deleteStudent(id){
        let data = model.readStudent()
        for(let a = 0 ; a < data.length; a++){
            if(data[a].id == id){
                data.splice(a, 1)
            }
        }
        model.writeStudent(data)
    }

    static editStudent(id, fname, lname, email, gender, birthDate){
        model.deleteStudent(id)
        model.addStudent(fname, lname, email, gender, birthDate)
    }
}

module.exports = model