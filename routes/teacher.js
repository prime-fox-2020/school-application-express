
const fs = require('fs')

const {Router} = require('express')
const router = Router() // this is routing, same as app.__ in app.js

// router.get('/teachers', (req, res) => { // (localhost:3000/teachers) nantinya
router.get('/', (req, res) => { // (localhost:3000/teachers)
    fs.readFile('./data/teachers.json', 'utf8', (err, data) => { //take data from jason
        if(err) res.send(err);
        res.render('teacher.ejs', {
            teachers: JSON.parse(data)
          })
    })
})

router.get('/:id', (req, res) => {
    fs.readFile('./data/teachers.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            if(req.params.id){
                const teachers = JSON.parse(data).filter( list => list.id === Number(req.params.id))
                res.render('teacher.ejs', {teachers})
                // res.send(`${req.params.id}`)
            }else{
                res.send(`invalid id of teachers`)
            }
        } 
    })
})
module.exports = router;
