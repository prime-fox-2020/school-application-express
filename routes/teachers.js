const routes = require('express').Router()
const fs = require ('fs')

routes.get('/', (req, res)=> {
    fs.readFile('./db/teachers.json', 'utf8', (err, data) => {
      if (err) {throw err}
      else {
        const teachers = JSON.parse(data)
        res.render('viewteachers', { teachers })
      }
    })
})

routes.get('/:id', (req, res)=> {
    let id = req.params.id
    let temp = {}
    for (let i = 0; i < teachers.length; i++){
      if (teachers[i].id == id){
        temp = teachers[i]
      }
    }
    res.send(`
      <h1> Data on Teacher with ID: ${id}</h1>
      <p>Name: ${temp.first_name} ${temp.last_name}</p>
      <p>Email: ${temp.email}</p>
      <p>Gender: ${temp.gender}</p>
    `)
})

module.exports = routes