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
      fs.writeFile('./data/students.json',JSON.stringify(data,null,2),(err,data)=>{
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

routes.get('/:id?/edit', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
      if (err) {
          res.send(err)
      } else {
          let students = JSON.parse(data)
          let length = students.length
          for (let i = 0; i < length + 1; i++) {
              if (req.params.id == students[i].id) {
                  let dataById = students[req.params.id - 1]
                  res.render('edit', { dataById })
                  break
              }
          }
      }
  })
})

routes.post('/:id?/edit', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, data) => {
      if (err) {
          res.send(err)
      } else {
          let students = JSON.parse(data)

          const id = req.params.id
          const first_name = req.body.first_name
          const last_name = req.body.last_name
          const email = req.body.email
          const gender = req.body.gender
          const birth_date = req.body.birth_date

          let temp = {
              "id": req.params.id,
              "first_name": first_name,
              "last_name": last_name,
              "email": email,
              "gender": gender,
              "birth_date": birth_date
          }

          students[req.params.id - 1] = temp
          fs.writeFileSync(`./students.json`, JSON.stringify(students, null, 2), 'utf8')
          res.render('students', { students })
      }
  })
})
routes.get("/:id/delete", (req, res) => {
  fs.readFile("./data/students.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      let id = req.params.id;
      let check = false;
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        if (Number(id) !== data[i].id) {
          newData.push(data[i]);
          check = true;
        }
      }

      students = newData;

      if (!check) {
        res.send("ID not found");
      } else {
        fs.writeFileSync("./data/students.json", JSON.stringify(students, null, 2));
        res.render("students", { students });
      }
    }
  });
});


module.exports = routes