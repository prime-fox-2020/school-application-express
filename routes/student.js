const route = require('express').Router();
const fs = require('fs');

route.get('/', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            res.render('student', {data});
        }
    })
})

route.get('/:email', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            let email = req.params.email, result;
            let check = false;

            data.forEach(el => {
                if(email === el.email){
                    result = el;
                    check = true;
                }
            });

            if(!check){
                res.send('Wrong email!');
            } else {
                res.send(result);
            }
        }
    })
})

module.exports = route;