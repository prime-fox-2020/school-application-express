const express = require('express')
const routes = require('./routes')

const app = express()

app.set('view engine', 'ejs')
app.use(routes)

app.listen(3000, () => {
  console.log('server is on port 3000')
})