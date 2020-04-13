const express = require('express')
const routes = require('./routes')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(routes)

app.listen(port, () => {
    console.log(`This app is running at port : ${port}`)
})