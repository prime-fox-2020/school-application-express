
const express = require('express')
const app = express()
const port = 3000

const index = require('./routes/index.js') // from routes index (router)
app.use(index) // use the routes

app.listen(port, function (){
    console.log(`This app working on port: ${port}`)
})

