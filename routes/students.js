const { Router } = require('express')
const router = Router()

const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            res.render('./students.ejs', { data })
        }
    })

})

router.get('/:email', (req, res) => {
    fs.readFile('./students.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            // console.log(data);
            const emailSt = req.params.email

            let result = null;

            for (let i = 0; i < data.length; i++) {
                if (emailSt === data[i].email) {
                    result = data[i]
                }
            }
            if (result) {
                // result = data;
                data = data.filter(data => data.email === req.params.email)
                res.render('./students.ejs', {data})
            } else {
                res.send('Tidak ada email seperti itu...')
            }
        }
    })
})

module.exports = router