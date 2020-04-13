const fs = require('fs');


class Teachers {
    constructor(id, first_name, last_name, email, gender) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
    }
}

class Students {
    constructor(id, first_name, last_name, email, gender, birth_date) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
        this.birth_date = birth_date
    }
}

class Subjects {
    constructor(id, subject_name) {
        this.id = id
        this.subject_name = subject_name
    }
}

class Backend {

    static db = (tableSelection) => new Promise((resolve, reject) => {

        let DBFile;

        switch (tableSelection) {
            case 'teachers' : DBFile = './db/teachers.json'; break;
            case 'students' : DBFile = './db/students.json'; break;
            case 'subjects' : DBFile = './db/subjects.json'; break; 
        }

        fs.readFile(DBFile, (err, data) => {
            if (!err) {
                resolve(JSON.parse(data))
            } else {
                reject(err)
            }
        })

    })

    static DbUpdate = (tableSelection, data) => {
        let DBFile;

        switch (tableSelection) {
            case 'teachers' : DBFile = './db/teachers.json'; break;
            case 'students' : DBFile = './db/students.json'; break;
            case 'subjects' : DBFile = './db/subjects.json'; break; 
        }

        fs.writeFileSync(DBFile, JSON.stringify(data, null, 2))
    }

    static findById = (tableSelection, property, id) => new Promise((resolve, reject) => {
        property = id.indexOf('@') !== -1 ? 'email' : 'id';

        this.db(tableSelection)
            .then(result => {
                resolve(result.filter(el => el[property] == id))
            })
            .catch(err => reject(err))
    })

    static newData = (tableSelection, content) => {
        this.db(tableSelection)
            .then(data => {

                let id = data.length + 1, object;

                switch (tableSelection) {
                    case 'teachers' : object = new Teachers(id, content.first_name, content.last_name, content.email, content.gender); break;
                    case 'students' : object = new Students(id, content.first_name, content.last_name, content.email, content.gender, content.birth_date); break;
                    case 'subjects' : object = new Subjects(id, content.subject_name)
                }
                data.push (object)
                this.DbUpdate(tableSelection, data)

            })
            .catch(err => err)
    }

    static delete = (tableSelection, id) => new Promise((resolve, reject) => {
        this.db(tableSelection)
            .then(data => {

                data.map((_, i) => {
                    
                    let props = id.indexOf('@') !== -1 ? 'email' : 'id'

                    if (data[i][props] == id) {
                        data.splice(i, 1)
                    }
                })

                this.DbUpdate(tableSelection, data)
                resolve(tableSelection)
            })
            .catch(err => reject(err))
    })

    static update = (tableSelection, content) => {
        this.db(tableSelection)
            .then(data => {
                data.forEach(el => {
                    if (el.id == content.id) {
                        if (content.hasOwnProperty('subject_name')) el.subject_name = content.subject_name
                        if (content.hasOwnProperty('first_name')) el.first_name = content.first_name
                        if (content.hasOwnProperty('last_name')) el.last_name = content.last_name
                        if (content.hasOwnProperty('email')) el.email = content.email
                        if (content.hasOwnProperty('gender')) el.gender = content.gender
                        if (content.hasOwnProperty('birth_date')) el.birth_date = content.birth_date
                    }
                })

                this.DbUpdate(tableSelection, data)
            })

            .catch(err => err)
    }
}

module.exports = Backend