const { Router } = require('express')
const fs = require('fs')

const teachersRoute = Router()

teachersRoute.get('/', (req, res) => {
    fs.readFile('./teachers.json', 'utf-8', (err, data) => {
        let parsedJson = JSON.parse(data);
        // res.send(parsedJson);
        res.render('teachers.ejs', {teachers: parsedJson});
    });
});

teachersRoute.get('/:id', (req, res) => {
    fs.readFile('./teachers.json', 'utf-8', (err, data) => {
        let result = null;
        let parsedJson = JSON.parse(data);
        for(let i = 0; i < parsedJson.length; i++) {
            let teacher = parsedJson[i];
            if(teacher.id == req.params.id) {
                result = teacher;
                break;
            }
        }
        if(result) {
            res.send(result);
        } else {
            res.send('Teacher not found');
        }
    });
});

module.exports = teachersRoute; 