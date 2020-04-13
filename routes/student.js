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

route.get('/add', (req, res) => {
    res.render('student_add');
})

route.post('/add', (req, res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let gender = req.body.gender;
    let dateArr = req.body.birth_date.split('-');

    switch(dateArr[1]){
        case '01': dateArr[1] = 'Januari'
            break;
        case '02': dateArr[1] = 'Februari'
            break;
        case '03': dateArr[1] = 'Maret'
            break;
        case '04': dateArr[1] = 'April'
            break;
        case '05': dateArr[1] = 'Mei'
            break;
        case '06': dateArr[1] = 'Juni'
            break;
        case '07': dateArr[1] = 'Juli'
            break;
        case '08': dateArr[1] = 'Agustus'
            break;
        case '09': dateArr[1] = 'September'
            break;
        case '10': dateArr[1] = 'Oktober'
            break;
        case '11': dateArr[1] = 'November'
            break;
        case '12': dateArr[1] = 'Desember'
            break;
        default:
            break;
    }
    let birth_date = dateArr.reverse().join(' ');

    fs.readFile('./data/students.json', 'utf-8', (err, data) => {
        if(err){
            res.send(err);
        } else {
            data = JSON.parse(data);
            data.push({
                id: data[data.length - 1].id + 1,
                first_name,
                last_name,
                email,
                gender,
                birth_date
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

                        switch (date[1]) {
                            case 'Januari': date[1] = '01'
                                break;
                            case 'Februari': date[1] = '02'
                                break;
                            case 'Maret': date[1] = '03'
                                break;
                            case 'April': date[1] = '04'
                                break;
                            case 'Mei': date[1] = '05'
                                break;
                            case 'Juni': date[1] = '06'
                                break;
                            case 'Juli': date[1] = '07'
                                break;
                            case 'Agustus': date[1] = '08'
                                break;
                            case 'September': date[1] = '09'
                                break;
                            case 'Oktober': date[1] = '10'
                                break;
                            case 'November': date[1] = '11'
                                break;
                            case 'Desember': date[1] = '12'
                                break;
                            default:
                                break;
                        }

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

            switch(dateArr[1]){
                case '01': dateArr[1] = 'Januari'
                    break;
                case '02': dateArr[1] = 'Februari'
                    break;
                case '03': dateArr[1] = 'Maret'
                    break;
                case '04': dateArr[1] = 'April'
                    break;
                case '05': dateArr[1] = 'Mei'
                    break;
                case '06': dateArr[1] = 'Juni'
                    break;
                case '07': dateArr[1] = 'Juli'
                    break;
                case '08': dateArr[1] = 'Agustus'
                    break;
                case '09': dateArr[1] = 'September'
                    break;
                case '10': dateArr[1] = 'Oktober'
                    break;
                case '11': dateArr[1] = 'November'
                    break;
                case '12': dateArr[1] = 'Desember'
                    break;
                default:
                    break;
    }
    let birth_date = dateArr.reverse().join(' ');

            data.forEach(el => {
                if(el.id == id){
                    result.push({
                        id,
                        first_name,
                        last_name,
                        email,
                        gender,
                        birth_date
                    });
                } else {
                    result.push(el);
                }
            });

            console.log(result);

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