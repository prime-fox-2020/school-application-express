const route = require('express').Router();

route.get('/', (req, res) => res.send('<h1>SCHOOL APPLICATION APP<h1>'));

route.use('/teachers', require('./teacher'));
route.use('/students', require('./student'));
route.use('/subjects', require('./subject'));

module.exports = route;