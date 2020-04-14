const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false }));
app.use(routes)

app.listen(port, () => {
  console.log(`Connected on port ${port}`)
})