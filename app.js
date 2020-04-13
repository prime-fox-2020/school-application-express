const express = require('express');
const app = express()
const port = 3000
const router = require('./routes');

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'))

app.set('view engine', 'ejs')
app.use('/', router)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))