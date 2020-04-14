
const express = require('express')
const app = express()
const routes = require('./routes')
// const index = require('./routes/index.js') // from routes/index (router)

app.use(express.urlencoded({extended: false}))
app.use(routes) // use the routes folder
// app.use(index) // use the routes/index

app.set('view engine', 'ejs') // for views in index,students,subjects,teachers

const port = 3000
app.listen(port, () => {console.log(`This app working on port: ${port}`)})

