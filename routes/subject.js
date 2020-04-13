
const fs = require('fs')

const {Router} = require('express')
const router = Router() // this is routing, same as app.__ in app.js


router.get('/', (req, res) => { // (localhost:3000/subjects)
    fs.readFile('./data/subjects.json', 'utf8', (err, data) => { //take data from jason
        if(err) res.send(err)
        res.render('subject.ejs', {
            subjects: JSON.parse(data)
          })
    })
})

router.get('/:id', (req, res) => {
    fs.readFile('./data/subjects.json', 'utf8', (err,data) => {
        if(err) res.send(err)
        else{
            if(req.params.id){
                const subjects = JSON.parse(data).filter( list => list.id === Number(req.params.id))
                res.render('subject.ejs', {subjects})
            }else{
                res.send(`invalid id of subjects`)
            }
        } 
    })
})

module.exports = router;
