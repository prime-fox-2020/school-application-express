const express = require('express')
const routesTeachers = require(`./teachersRoute`)
const routesStudents = require(`./studentsRoute`)
const routesSubjects = require(`./subjectsRoute`)
const app = express()



app.get(`/`,(req,res)=>{

    res.render(`index`)
})

app.set(`view engine`,`ejs`)

app.use(`/teachers`,routesTeachers)
app.use(`/students`,routesStudents)
app.use(`/subjects`,routesSubjects)



app.listen(3001, ()=>{

    console.log(`tes Running whith port : 3001`)
})
