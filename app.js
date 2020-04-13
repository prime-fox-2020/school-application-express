const express = require('express')
const app = express()
const port = 3000

const routerTeachers = require('./routes/teachers')
const routerSubjects = require('./routes/subjects') 
const routerStudents = require('./routes/students') 

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

//Rendering Pages
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.use('/teachers',routerTeachers)
app.use('/subjects',routerSubjects)
app.use('/students',routerStudents)

//Information
app.listen(port, function(){
    console.log('this app running on port: ', port)
}) 
