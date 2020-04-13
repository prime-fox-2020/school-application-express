const express = require('express')
const app = express()

const port = 3000

const router = require('./routes')

app.use(router)

app.listen(port, (err, res) => {
    if (err) {
        console.log('Erorrrr');
    } else {
        console.log('App berjalan di: ', port);
    }

})