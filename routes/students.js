const fs = require("fs");
const routes = require("express").Router();

// LIST STUDENT
routes.get("/", (req, res) => {
  fs.readFile("./data/students.json", "utf8", (err, data) => {
    if (err) res.send(err);
    else data = JSON.parse(data);
    res.render("students", { data });
  });
});

// ADD STUDENTS
routes.get("/add", (req, res) => {
  fs.readFile("./data/students.json", "utf8", (err, data) => {
    if (err) res.send(err);
    else data = JSON.parse(data);
    res.render("add");
  });
});

routes.post("/add", (req, res) => {
  const { first_name, last_name, email, gender, birth_date } = req.body;
  fs.readFile("./data/students.json", "utf8", (err, data) => {
    if (err) res.send(err);
    else data = JSON.parse(data);
    data.push({
      id: data.length + 1,
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      birth_date: birth_date
    });
    fs.writeFileSync("./data/students.json", JSON.stringify(data, null, 2));
    res.render("students", { data });
  });
});

//PARAM EMAIL
routes.get("/:email", (req, res) => {
  fs.readFile("./data/students.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      let email = req.params.email,
        result;
      let check = false;

      data.forEach(item => {
        if (email == item.email) {
          result = item;
          check = true;
        }
      });

      if (!check) {
        res.send("Email not found");
      } else {
        res.send(result);
      }
    }
  });
});

//EDIT PARAMS
routes.get("/:id/edit", (req, res) => {
  fs.readFile("./data/students.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      let id = req.params.id;
      // , result;
      let check = false;
      let dataID;
      for (let i = 0; i < data.length; i++) {
        if (Number(id) === data[i].id) {
          dataID = i;
          check = true;
        }
      }

      if (!check) {
        res.send("ID not found");
      } else {
        res.render("edit", { data: data[dataID] });
      }
    }
  });
});

routes.post("/:id/edit", (req, res) => {
  const { first_name, last_name, email, gender, birth_date } = req.body;
  fs.readFile("./data/students.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      data = JSON.parse(data);
      let id = req.params.id;
      let check = false;
      let dataID;
      for (let i = 0; i < data.length; i++) {
        if (Number(id) === data[i].id) {
          dataID = i;
          check = true;
        }
      }
      data[dataID].first_name = first_name;
      data[dataID].last_name = last_name;
      data[dataID].email = email;
      data[dataID].gender = gender;
      data[dataID].birth_date = birth_date;

      if (!check) {
        res.send("ID not found");
      } else {
        fs.writeFileSync("./data/students.json", JSON.stringify(data, null, 2));
        res.render("students", { data });
      }
    }
  });
});

//DELETE BY ID
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

      data = newData;

      if (!check) {
        res.send("ID not found");
      } else {
        fs.writeFileSync("./data/students.json", JSON.stringify(data, null, 2));
        res.render("students", { data });
      }
    }
  });
});
module.exports = routes;
