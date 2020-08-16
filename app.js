'use strict';
const express = require('express');
const routes = require('./routes');

// FROM JSON TO DATABASE
// const client = require('./db/config');
// const DataInit = require('./db/databaseInit');
// const filePath = ['./datas/students.json', './datas/teachers.json', './datas/subjects.json'];
// DataInit.convertToDB(filePath, client);

const app = express();

app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(routes);

app.listen(3000, () => console.log("Now i'm listening at port 3000"));