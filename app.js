const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(routes)

app.listen(3000, ()=> {
    console.log(`App online!`)
})