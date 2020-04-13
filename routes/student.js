const route = require('express').Router();
const fs = require('fs');
const ChangeMonth = require('../helpers/date');

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

route.get('/add', (req, res) => {
    res.render('student_add');
})

route.post('/add', (req, res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let gender = req.body.gender;
    let dateArr = req.body.birth_date.split('-');

    dateArr[1] = ChangeMonth.changeToWord(dateArr[1]);
    dateArr[2] = dateArr[2].substring(1);
    let birth_date = dateArr.reverse().join(' ');

    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            data.push({
                id: data[data.length - 1].id + 1, first_name, last_name, email, gender, birth_date
            });

            fs.writeFile('./data/students.json', JSON.stringify(data, null, 2), (err) => {
                if(err){
                    res.send(err);
                } else {
                    res.redirect('/students');
                }
            })
        }
    })
})


route.get('/:id/edit', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            let id = req.params.id

            if(data.length >= Number(id)){
                data.forEach(el => {
                    if(el.id == id){
                        let date = el.birth_date.split(' ');
                        if(date[0] < 10){
                            date[0] = `0${date[0]}`
                        }
                        date[1] = ChangeMonth.changeToNumber(date[1]);
                        let birth_date = date.reverse().join('-');
                        res.render('student_edit', {el, id, birth_date});
                    }
                });
            } else {
                res.send('Wrongg Id!')
            }
        }
    })
})

route.post('/:id/edit', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            let id = Number(req.params.id);
            let result = [];
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let email = req.body.email;
            let gender = req.body.gender;
            let dateArr = req.body.birth_date.split('-');

            dateArr[1] = ChangeMonth.changeToWord(dateArr[1]);
            dateArr[2] = dateArr[2].substring(1);
            let birth_date = dateArr.reverse().join(' ');

            data.forEach(el => {
                if(el.id == id){
                    result.push({
                        id, first_name, last_name, email, gender, birth_date
                    });
                } else {
                    result.push(el);
                }
            });

            fs.writeFile('./data/students.json', JSON.stringify(result, null, 2), (err) => {
                if(err){
                    res.send(err);
                } else {
                    res.redirect('/students');
                }
            })
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

route.get('/:id/delete', (req, res) => {
    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            let id = req.params.id;
            let result = [];

            data.forEach(el => {
                if(el.id != id){
                    result.push(el);
                }
            });

            if(id > data.length){
                res.send('Wrong Id!')
            } else {
                fs.writeFile('./data/students.json', JSON.stringify(result, null, 2), (err) => {
                    if(err){
                        res.send(err);
                    } else {
                        res.redirect('/students')
                    }
                })
            }
        }
    })
})

module.exports = route;