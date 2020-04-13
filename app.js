const express = require('express');
const router = require('./routes/index');
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(port, () => console.log('Listening on port: ', port));