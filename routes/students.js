const routes = require('express').Router()
const fs = require('fs')


routes.get('/', (req, res) => {
  fs.readFile('./data/students.json','utf8', (err, data) => {
    data = JSON.parse(data)
    if(err) {
      res.send(err)
    } else {
      res.render('students', {students: data})
    }
  })
})

routes.get('/add', (req, res) => {
  fs.readFile("./data/students.json", "utf8", (err, data) => {
    if(err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      res.render("add");
    }
  });
})

routes.post("/add", (req, res) => {
  const { first_name, last_name, email, gender, birth_date } = req.body;
  fs.readFile("./data/students.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    } else { 
      data = JSON.parse(data);
      data.push({
        id: data.length + 1,
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        birth_date: birth_date
      });
      fs.writeFile('./data/students.json',JSON.stringify(data),(err,data)=>{
        if(err) {
          res.send(err)
        } else{
          res.redirect('/students')
        }
      })
    }
  });
});

routes.get('/:email', (req, res) => {
  fs.readFile('./data/students.json','utf8', (err, data) => {
    if(err) {
      res.send(err)
    } else {
      let dataParse = JSON.parse(data)
      let email = []
      for(let i = 0; i < dataParse.length; i++) {
        if(dataParse[i].email === req.params.email) {
          email.push(dataParse[i])
        }
      }
      if(email.length > 0) {
        res.render('students', {students: email})
      } else {
        res.send('Not Found')
      }
    }
  })
})



module.exports = routes