const fs = require('fs')

const {Router} = require('express')
const router = Router() // this is routing, same as app.__ in app.js

router.get('/students', (req, res) => { // (localhost:3000/students)
    fs.readFile('./data/students.json', 'utf8', (err, data) => { //take data from jason
        if(err) {
          res.send(err)
        }else{
          res.send(JSON.parse(data))
        }
    })
})

module.exports = router;