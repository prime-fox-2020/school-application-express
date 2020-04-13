
const fs = require('fs')

const {Router} = require('express')
const router = Router() // this is routing, same as app.__ in app.js

router.get('/teachers', (req, res) => { // (localhost:3000/teachers)
    fs.readFile('./data/teachers.json', 'utf8', (err, data) => { //take data from jason
        if(err) res.send(err);
        res.send(JSON.parse(data))
    })
})

module.exports = router;
