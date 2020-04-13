const express = require('express')
const routes = require('./routes')

const app = express()
app.use(routes)

app.listen(3000, () => console.log('App is running at port 3000'))