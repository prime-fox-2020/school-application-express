const express = require('express');

const app = express();
const port = 3001;
const routes = require('./routes');

app.use(routes);

app.get('/', (req, res) => {
  res.send('home');
})

app.listen(port, () => console.log(`App running in port ${port}`));