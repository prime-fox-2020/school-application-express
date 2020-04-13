const fs = require('fs');

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
}

module.exports = Backend