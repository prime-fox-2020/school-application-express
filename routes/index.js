const route = require('express').Router();
// const teachersRoute = require('./teacher');
// const studentsRoute = require('./teacher');
// const subjectsRoute = require('./teacher');

route.get('/', (req, res) => res.send('<h1>SCHOOL APPLICATION APP<h1>'));

route.use('/teachers', require('./teacher'));
route.use('/students', require('./student'));
route.use('/subjects', require('./subject'));

module.exports = route;