const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require('./routes')

const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(routes)

app.listen(port, () => {
    console.log('This app is running at port : ', port)
})