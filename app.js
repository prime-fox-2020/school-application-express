const express = require('express')
const app = express()
const port = 3000
const indexRouter = require('./routes/index-router.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true})) 
app.use(indexRouter);

app.listen(port, (req, res) => {
    console.log(`This app is running on port ${port}`);
})