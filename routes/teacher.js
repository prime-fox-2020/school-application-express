const route = require('express').Router();
const fs = require('fs');

route.get('/', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            res.render('teacher', {data});
        }
    })
})

route.get('/:id', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            let id = req.params.id, result;
            let check = false;

            data.forEach(el => {
                if(id == el.id){
                    result = el;
                    check = true;
                }
            });

            if(!check){
                res.send('Wrong Id!')
            } else {
                res.send(result);
            }
        }
    })
})

module.exports = route;