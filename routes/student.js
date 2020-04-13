const fs = require('fs')
const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, datas) => {
    let errorMsg
    if (err) {
      errorMsg = 'File not found!'
      res.render('404', errorMsg)
    } else {
      const students = JSON.parse(datas)
      res.render('studentShowAll', { students })
    }
  })
})

routes.get('/add', (req, res) => {
  res.render('addStudent')
})

routes.post('/add', (req, res) => {
  let errorMsg
  const {first_name, last_name, email, gender} = req.body
  if (first_name && last_name && email&& gender) {
    fs.readFile('./data/students.json', 'utf8', (err, datas) => {
      if (err) {
        errorMsg = `Failed to connect database!`
        res.render('404', { errorMsg })
      } else {
        const students = JSON.parse(datas)
        const id = students[students.length - 1].id + 1
        students.push({
          id,
          first_name,
          last_name,
          gender,
          email
        })

        fs.writeFile('./data/students.json', JSON.stringify(students, null, 2), err => {
          if (err) {
            errorMsg = `Failed to connect database!`
            res.render('404', { errorMsg })
          } else {
            res.redirect('/students')
          }
        })
      }
    })
  } else {
    errorMsg = `All fields can not be empty!`
    res.render('404', { errorMsg })
  }
})

routes.get('/:id/edit', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, datas) => {
    let errorMsg
    if (err) {
      errorMsg = `Failed to connect database!`
      res.render('404', {errorMsg})
    } else {
      const students = JSON.parse(datas).filter(student => student.id === Number(req.params.id))
      const student = students[0]
      if (students.length) {
        res.render('editStudent', {student})
      } else {
        errorMsg = `Student with ID ${req.params.id} is not found!`
        res.render('404', {errorMsg})
      }
    }
  })
})

routes.post('/:id/edit', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, datas) => {
    let errorMsg
    if (err) {
      errorMsg = `Failed to connect database!`
      res.render('404', { errorMsg })
    } else {
      const {first_name, last_name, gender, email} = req.body
      if (first_name && last_name && gender && email) {
        const students = JSON.parse(datas)
        const idx = students.findIndex(student => student.id === Number(req.params.id))
        students[idx] = { id: Number(req.params.id), first_name, last_name, gender, email }
        fs.writeFile('./data/students.json', JSON.stringify(students, null, 2), err => {
          if (err) {
            errorMsg = `Failed to edit student with ID ${req.params.id}!`
            res.render('404', { errorMsg })
          } else {
            res.redirect('/students')
          }
        })
      } else {
        errorMsg = `All fields can not be empty!`
        res.render('404', { errorMsg })
      }
    }
  })
})

routes.get('/:id/delete', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, datas) => {
    let errorMsg
    if (err) {
      errorMsg = `Failed to connect database!`
      res.render('404', {errorMsg})
    } else {
      const students = JSON.parse(datas).filter(student => student.id !== Number(req.params.id))
      fs.writeFile('./data/students.json', JSON.stringify(students, null, 2), err => {
        if (err) {
          errorMsg = `Delete data user with ID ${req.params.id} is failed!`
          res.render('404', {errorMsg})
        } else {
          res.redirect('/students')
        }
      })
    }
  })
})

routes.get('/:email', (req, res) => {
  fs.readFile('./data/students.json', 'utf8', (err, datas) => {
    if (err) {
      res.send('File not found!')
    } else {
      const students = JSON.parse(datas)
      const student = students.find(s => s.email === req.params.email)
      if (student) {
        res.send(student)
      } else {
        res.send(`Student with email ${req.params.email} is not found!`)
      }
    }
  })
})

module.exports = routes