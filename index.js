const express = require("express");
const fs = require("fs")
const bodyParser = require("body-parser")
const Convert = require("./convertTime")
const app = express()


app.listen(3000)
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extends: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/teachers", (req, res) => {
    fs.readFile("./teachers.json", "utf8", (err, data) => {
        if (err) console.log(err)

        else {
            // parse JSON-nya
            const teacher = JSON.parse(data)
            res.render("teachers", { teachers: teacher })
        }
    })
})

app.get("/teachers/:id", (req, res) => {
    fs.readFile("./teachers.json", "utf8", (err, data) => {
        if (err) console.log(err)
        else {
            const teacher = JSON.parse(data)
            res.render("teachers", { teachers: [teacher[req.params.id - 1]] })
        }
    })
})

app.get("/students", (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) console.log(err)
        else {
            // parse JSON-nya
            const student = JSON.parse(data)
            res.render("students", { students: student })
        }
    })
})

app.get("/students/:id/delete", (req,res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if(err) console.log(err)

        else{
            const students = JSON.parse(data)
            for (let i = 0; i < students.length; i++) {
                if(Number(req.params.id) == students[i].id){
                    students.splice(i,1)
                }
            }
            const stringi = JSON.stringify(students, null, 3)
            fs.writeFile("./students.json", stringi, (err) => {
                if (err) console.log(err)
                res.redirect("/students")
            })
        }
    })
})

app.post("/students/:id", (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) console.log(err)
        else {
            const students = JSON.parse(data)
            const first_name = req.body.first_name
            const last_name = req.body.last_name
            const email = req.body.email
            const gender = req.body.gender
            const birthdate = req.body.birthdate
            console.log(birthdate)
            let formatDate = Convert.dateToString(birthdate)
            students.splice(req.params.id-1,1,{
                id: Number(req.params.id),
                first_name: first_name,
                last_name: last_name,
                email: email,
                gender: gender,
                birth_date: formatDate
            })

            const stringi = JSON.stringify(students, null, 3)
            fs.writeFile("./students.json", stringi, (err) => {
                if (err) console.log(err)
                res.redirect("/students")
            })
        }
    })
})

app.post("/students", (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) console.log(err)
        else {
            const students = JSON.parse(data)
            const first_name = req.body.first_name
            const last_name = req.body.last_name
            const email = req.body.email
            const gender = req.body.gender
            const birthdate = req.body.birthdate
            console.log(birthdate)
            let formatDate = Convert.dateToString(birthdate)
            students.push({
                id: students.length + 1,
                first_name: first_name,
                last_name: last_name,
                email: email + "@sekolah.id",
                gender: gender,
                birth_date: formatDate
            })

            const stringi = JSON.stringify(students, null, 3)
            fs.writeFile("./students.json", stringi, (err) => {
                if (err) console.log(err)
                res.redirect("/students")
            })
        }
    })
})

app.get("/students/add", (req, res) => {
    res.render("add")
})

app.get("/students/:id/edit", (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) console.log(data)
        else {
            const student = JSON.parse(data)
            student[req.params.id-1].birth_date = Convert.stringToDate(student[req.params.id-1].birth_date)
            res.render("edit", {student : student[req.params.id-1]})
        }
    })
})

app.get("/students/:email", (req, res) => {
    fs.readFile("./students.json", "utf8", (err, data) => {
        if (err) console.log(data)
        else {
            let index;
            const student = JSON.parse(data)
            for (let i = 0; i < student.length; i++) {
                if(req.params.email == student[i].email){
                    index = i
                } 
            }
            res.render("students", { students: [student[index]] })
        }
    })
})


app.get("/subjects", (req, res) => {
    fs.readFile('./subjects.json', "utf8", (err, data) => {
        if (err) console.log(err)
        else {
            // parse JSON-nya
            const subjects = JSON.parse(data)
            res.render("subjects", { subjects: subjects })
        }
    })
})

app.get("/subjects/:id", (req, res) => {
    res.render("subjects", { subjects: [subjects[req.params.id - 1]] })
})

