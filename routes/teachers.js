const {Router} = require('express')
const router = Router()

const fs = require ('fs')
// let data = fs.readFile('./data/teachers.json','utf-8', (err,res) =>{
//     if(err) console
// })
// data = JSON.parse(data)

// console.log(data)

router.get('/teachers', function (req, res){
    // res.send('masuk')
    fs.readFile('./teachers.json', 'utf8', (err,data) => {
        if(err){
            res.send(err)
        } else{
            let teachers_list = JSON.parse(data)
            res.render('teachers', {teachers_list})
        }
    })
})

module.exports = router