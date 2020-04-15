const routes = require('express').Router()
const fs = require('fs')
// const subjects = JSON.parse(fs.readFileSync('./db/subjects.json', 'utf8'))

routes.get('/', (req, res)=> {
  fs.readFile('./db/subjects.json', 'utf8', (err, data) => {
    if (err) {throw err}
    else {
      const subjects = JSON.parse(data)
      res.render('viewsubjects', { subjects })
    }
  })
})

routes.get('/:id', (req, res)=> {
    let id = req.params.id
    let temp = {}
    for (let i = 0; i < subjects.length; i++){
      if (subjects[i].id == id){
        temp = subjects[i]
      }
    }
    res.send(`
      <h1> Data on Subject with ID: ${id}</h1>
      <p>Subject Name: ${temp.subject_name}</p>
    `)
})

module.exports = routes