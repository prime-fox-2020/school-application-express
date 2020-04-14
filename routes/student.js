const fs = require('fs')

const {Router} = require('express')
const router = Router() // this is routing, same as app.__ in app.js

//LIST
router.get('/', (req, res) => { // (localhost:3000/students) nantinya
    fs.readFile('./data/students.json', 'utf8', (err, data) => { //take data from json
        if(err) {
          // res.send(err)
          res.render(err)
        }else{
          // res.send(JSON.parse(data))
          res.render('student.ejs', {
            students: JSON.parse(data)
          })
        }
    })
})

//ADD
router.get('/add', (req, res) => {
    res.render('studentAdd.ejs')
})

router.post('/add', (req, res) => { // bc button type => submit
    fs.readFile('./data/students.json', 'utf8', (err, data) => { //take data from json
        if(err) {res.send(err)}
        else{
        let students = JSON.parse(data)
        students.push({
            "id": Number(students[Number(students.length - 1)].id) + 1,
            "first_name" : req.body.first_name ,
            "last_name" : req.body.last_name ,
            "email" : req.body.email ,
            "gender" : req.body.gender ,
            "birth_date" : req.body.birth_date
        })
        fs.writeFile('./data/students.json', JSON.stringify(students, null, 2), (err) =>{
            if(err) res.send(err)
            res.render('student.ejs', {students})
        })
        }
})
})

//EMAIL ==============================
router.get('/:email?', (req, res) => {
    fs.readFile('./data/students.json', 'utf8', (err, data)=> {
        if(err) {res.send (err)}
        else{
            let students = JSON.parse(data)
            // const match = students.some(key => key.email === req.params.email)
            if (req.params.email) {
                students = students.filter(key => key.email === req.params.email)
                    res.render('./student.ejs',{students})
            } else {
                res.send(`no students with particular email found.`)
                let students = JSON.parse(data)
                res.render('student.ejs', {students})
                
            }
        }
    })
})

//EDIT===============================
router.get('/:id/edit',function(req,res){
    fs.readFile('./data/students.json','utf8',(err,data) => {
        if(err){
            res.send(err)
        }
        else{
            const students = JSON.parse(data)
            const match = students.filter(key => key.id === req.params.id)
            res.render('studentEdit.ejs', {match})
        }
    })  
})

router.post('/:id/edit',function(req,res){
    fs.readFile('./data/students.json','utf8',(err,data) => {
        if(err){
            res.send(err)
        }else{
            let students = JSON.parse(data)
            for (let i = 0; i < students.length; i++) {
                if (students[i].id === Number(req.body.id)) {
                    students[i].first_name = req.body.first_name
                    students[i].last_name = req.body.last_name
                    students[i].email = req.body.email
                    students[i].birth_date = req.body.birth_date
                }
                
            }
            fs.writeFile('./data/students.json', JSON.stringify(parseData, null, 2), (err) =>{
                if(err) res.send(err)
                res.render('student.ejs', {students})
            })
        }
    })  
})

//DELETE ================================
router.get('/:id/delete',function(req,res){
    fs.readFile('./data/students.json','utf8',(err,data)=>{
        if(err){
          res.send(err)
        }else{
            let students = JSON.parse(data)
            let result = [] 
            for (let i = 0; i < students.length; i++) {
                if(Number(students[i].id) !== Number(req.params.id)){
                    result.push(students[i])
                }
            }
            fs.writeFile('./data/students.json', JSON.stringify(result, null, 2), (err) =>{
                if(err) res.send(err)
                res.render('student.ejs', {students})
            })
        }
    })  
})


module.exports = router;