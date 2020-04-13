'use strict';
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(routes);

app.listen(3000, () => console.log("Now i'm listening at port 3000"));