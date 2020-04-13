const express = require('express');
const app = express();
const routes = require('./routes');

const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended : false}));
app.use(routes);

app.listen(port, function() {
  console.log('This app running on port: ', port);
})
