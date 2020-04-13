const express = require('express')
const route = express.Router()

route.get('/', (req, res)=>{
  res.send('<h1>School Aplication PART 2</h1>')
})

route.use('/students', require('./students'))
route.use('/teachers', require('./teachers'))
route.use('/subjects', require('./subjects'))

module.exports = route