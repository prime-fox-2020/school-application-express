const express=require('express')
const routes=require('./routes')
// var bodyParser = require('body-parser');


const app=express()
const port=3000
app.use(express.urlencoded({ extended : false }));
app.use(routes)
app.set('view engine','ejs')


// app.use(bodyParser.urlencoded({ extended : false }));

app.listen(port,function(){
    console.log('CONNECTED')
})